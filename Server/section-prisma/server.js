const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

const secret = crypto.randomBytes(32).toString('hex');
const adminSecret = crypto.randomBytes(32).toString('hex');

app.post('/register', async (req, res) => {
    const { username, email, password, height, weight } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                user_name: username,
                user_email: email,
                user_password: hashedPassword,
                user_height: height,
                user_weight: weight,
            },
        });

        return res.json({ success: true, data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                user_email: email,
            },
        });

        if (!user) {
            return res.json({ error: "User not found or invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.user_password);

        if (match) {
            const token = jwt.sign({ user_id: user.user_id }, secret, { expiresIn: '1h' });
            return res.json({ success: true, token: token });
        } else {
            return res.json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ error: "Error authenticating user" });
    }
});


async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secret);
        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.user_id,
            },
        });

        if (!user) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


app.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: req.user.user_id,
            },
            select: {
                user_id: true,
                user_name: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ success: true, message: "Protected route accessed", user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/admin/login', async (req, res) => {
    const { admin_email, admin_password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({
            where: {
                admin_email: admin_email,
            },
        });

        if (!admin) {
            return res.status(401).json({ error: "Admin not found or invalid credentials" });
        }

        const match = await bcrypt.compare(admin_password, admin.admin_password);

        if (match) {
            const token = jwt.sign({ admin_id: admin.admin_id }, adminSecret, { expiresIn: '1h' });
            return res.json({ success: true, token: token });
        } else {
            return res.status(401).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error('Error authenticating admin:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


async function authenticateAdminToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], adminSecret);
        const admin = await prisma.admin.findUnique({
            where: {
                admin_id: decoded.admin_id,
            },
        });

        if (!admin) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Error verifying admin token:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


app.get('/admin/dashboard', authenticateAdminToken, async (req, res) => {
    try {
        const admin = req.admin;
        return res.json({ success: true, message: "Admin protected route accessed", admin_id: admin.admin_id });
    } catch (error) {
        console.error('Error fetching admin details:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/admin/plans', authenticateAdminToken, async (req, res) => {
    try {
        const plans = await prisma.plan.findMany();
        return res.json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        return res.status(500).json({ error: 'Error fetching plans' });
    }
});


app.post('/admin/add-plan-with-workouts', authenticateAdminToken, async (req, res) => {
    const { plan_name, plan_total_day, plan_total_minute, plan_category, workouts } = req.body;

    try {
        const createdPlan = await prisma.plan.create({
            data: {
                plan_name,
                plan_total_day,
                plan_total_minute,
                plan_category,
                workouts: {
                    create: workouts.map(workout => ({
                        workout_name: workout.workout_name,
                        workout_description: workout.workout_description,
                        workout_minute: workout.workout_minute,
                        workout_set: workout.workout_set,
                        workout_rep: workout.workout_rep,
                        workout_day: workout.workout_day
                    }))
                }
            },
            include: {
                workouts: true
            }
        });

        return res.json({ success: true, message: 'Plan added successfully', plan_id: createdPlan.plan_id });
    } catch (error) {
        console.error('Error adding plan with workouts:', error);
        return res.status(500).json({ error: 'Error adding plan with workouts' });
    }
});


app.delete('/admin/delete-plan/:planId', authenticateAdminToken, async (req, res) => {
    const planId = parseInt(req.params.planId);

    try {
        await prisma.workout.deleteMany({
            where: {
                plan_id: planId
            }
        });

        await prisma.plan.delete({
            where: {
                plan_id: planId
            }
        });

        return res.json({ success: true, message: 'Plan and associated workouts deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan and associated workouts:', error);
        return res.status(500).json({ error: 'Error deleting plan and associated workouts' });
    }
});


app.put('/admin/update-plan/:planId', authenticateAdminToken, async (req, res) => {
    const planId = parseInt(req.params.planId);
    const { plan_name, plan_total_day, plan_total_minute, plan_category, workouts } = req.body;

    try {
        const updatedPlan = await prisma.plan.update({
            where: {
                plan_id: planId
            },
            data: {
                plan_name,
                plan_total_day,
                plan_total_minute,
                plan_category,
                workouts: {
                    deleteMany: {
                        where: {
                            plan_id: planId
                        }
                    },
                    create: workouts.map(workout => ({
                        workout_name: workout.workout_name,
                        workout_description: workout.workout_description,
                        workout_minute: workout.workout_minute,
                        workout_set: workout.workout_set,
                        workout_rep: workout.workout_rep,
                        workout_day: workout.workout_day
                    }))
                }
            },
            include: {
                workouts: true
            }
        });

        return res.json({ success: true, message: 'Plan updated successfully', updatedPlan });
    } catch (error) {
        console.error('Error updating plan and associated workouts:', error);
        return res.status(500).json({ error: 'Error updating plan and associated workouts' });
    }
});


app.get('/admin/plan/:planId/workouts', authenticateAdminToken, async (req, res) => {
    try {
        const { planId } = req.params;
        const workouts = await prisma.workout.findMany({
            where: {
                plan_id: parseInt(planId)
            }
        });

        return res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return res.status(500).json({ error: 'Error fetching workouts' });
    }
});


app.get('/dashboard/plans', authenticateToken, async (req, res) => {
    try {
        const plans = await prisma.plan.findMany({
            select: {
                plan_id: true,
                plan_name: true,
                plan_total_day: true,
                plan_total_minute: true,
                plan_category: true
            }
        });

        return res.json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        return res.status(500).json({ error: 'Error fetching plans' });
    }
});

  

app.get('/dashboard/plan-content/:planId', authenticateToken, async (req, res) => {
    const planId = parseInt(req.params.planId);

    try {
        const planDetails = await prisma.plan.findUnique({
            where: {
                plan_id: planId
            }
        });

        if (!planDetails) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        const workouts = await prisma.workout.findMany({
            where: {
                plan_id: planId
            }
        });

        const combinedData = {
            planDetails: planDetails,
            workouts: workouts
        };

        return res.json(combinedData);
    } catch (error) {
        console.error('Error fetching plan and workout details:', error);
        return res.status(500).json({ error: 'Error fetching plan and workout details' });
    }
});


app.post('/dashboard/enroll', authenticateToken, async (req, res) => {
    try {
        const { plan_id } = req.body;
        const user_id = req.user_id;

        const enrollment = await prisma.enrolledPlans.create({
            data: {
                user: {
                    connect: { user_id: user_id }
                },
                plan: {
                    connect: { plan_id: parseInt(plan_id) }
                }
            }
        });

        if (!enrollment) {
            return res.status(500).json({ error: 'Failed to enroll in the plan' });
        }

        return res.status(200).json({ message: 'Enrolled successfully' });
    } catch (error) {
        console.error('Error enrolling in the plan:', error);
        return res.status(500).json({ error: 'Error enrolling in the plan' });
    }
});

app.get('/dashboard/enrolled-plans', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user_id;

        const enrolledPlans = await prisma.enrolledPlans.findMany({
            where: {
                user_id: user_id
            }
        });

        return res.json(enrolledPlans);
    } catch (error) {
        console.error('Error fetching enrolled plans:', error);
        return res.status(500).json({ error: 'Error fetching enrolled plans' });
    }
});


app.get('/dashboard/enrolled-plans/enroll', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user_id;

        const enrolledPlans = await prisma.enrolledPlans.findMany({
            where: {
                user_id: user_id
            },
            include: {
                plan: {
                    select: {
                        plan_name: true,
                        plan_total_day: true,
                        plan_total_minute: true,
                        plan_category: true
                    }
                }
            }
        });

        return res.json(enrolledPlans);
    } catch (error) {
        console.error('Error fetching enrolled plans:', error);
        return res.status(500).json({ error: 'Error fetching enrolled plans' });
    }
});


app.post('/dashboard/unenroll', authenticateToken, async (req, res) => {
    const { plan_id } = req.body;
    const user_id = req.user.user_id;

    try {
        await prisma.enrolledPlans.deleteMany({
            where: {
                user_id: user_id,
                plan_id: parseInt(plan_id)
            }
        });

        return res.json({ success: true, message: 'Successfully unenrolled from the plan' });
    } catch (error) {
        console.error('Error unenrolling user:', error);
        return res.status(500).json({ error: 'Failed to unenroll user from the plan' });
    }
});


app.put('/update-workout-status/:workoutId', authenticateToken, async (req, res) => {
    const workoutId = req.params.workoutId;
    const { status } = req.body;

    try {
        await prisma.workout.update({
            where: {
                workout_id: workoutId
            },
            data: {
                status: status
            }
        });

        return res.status(200).json({ success: true, message: 'Workout status updated successfully' });
    } catch (error) {
        console.error('Error updating workout status:', error);
        return res.status(500).json({ success: false, message: 'Failed to update workout status' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
import Navbar from "./NavBar";
import Footer from "./Footer";
import Photo from "../assets/workout.png";
import Marga from "../assets/marga.png";
import Ceril from "../assets/ceril.png";
import Djen from "../assets/djen.png";
import Francis from "../assets/fran.png";
import Flex from "../assets/flexibility.png";
import Cardio from "../assets/cardio.png";
import Strength from "../assets/strength.png";

function About() {
  return (
    <div>
      <Navbar />
      <div className="md:p-10 my-5 mt-10 bg-gray-900 text-white">
        <div className="grid mt-6 md:grid-cols-2 px-10">
          <div className="maxImg">
            <img src={Photo} alt="" className="w-25 h-auto rounded-lg" />
          </div>
          <div className="lebrone my-5 md:my-0">
            <div className="md:mt-32">
              <h1 className="text-5xl font-bold max-font">About Fit Fusion.</h1>
              <p className="py-3">
                Welcome to Fit Fusion, your ultimate destination for a holistic
                approach to fitness and well-being. At Fit Fusion, we take pride
                in offering comprehensive workout plans meticulously crafted to
                cater to various fitness levels and aspirations. Our commitment
                extends beyond just exercise, as we provide nutrition excellence
                through carefully curated diets to fuel your journey to optimal
                health.
              </p>

              <p className="py-3">
                Fit Fusion is a dynamic and holistic fitness platform that
                integrates diverse workout routines, wellness practices, and
                expert guidance to cater to individual health goals. It offers a
                comprehensive range of exercises, including high-intensity
                interval training (HIIT), yoga, strength training, and dance
                workouts, ensuring a versatile approach to fitness. With a focus
                on personalized experiences, Fit Fusion empowers users to
                customize their fitness journey by accessing a library of
                classes led by top-tier instructors. Beyond workouts, it
                emphasizes holistic wellness, providing nutritional guidance,
                mindfulness sessions, and community support, fostering a
                well-rounded approach to health and vitality. Fit Fusion stands
                as an inclusive and adaptable fitness haven, inspiring
                individuals of all fitness levels to embark on a transformative
                and sustainable path towards overall well-being.
              </p>

              <button className="bn px-10 py-5 rounded-full bg-white text-gray-900 mt-5">
                Workout with us!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="services my-10 grid grid-cols-6">
          <div></div>
          <div className="col-span-4 ser p-5">
            <h1 className="text-5xl font-bold md:ml-5 text-gray-800">
              <center>Services</center>
            </h1>
            <p className="ml-5 mt-5 text-gray-700 max-font">
              Explore a diverse array of fitness services tailored to elevate
              your well-being at Fit Fusion. Our range of offerings goes beyond
              the conventional, providing a comprehensive approach to cardio,
              strength, and flexibility training. Discover a fitness experience
              designed to empower and transform.
            </p>
          </div>
          <div></div>
          <div></div>
        </div>

        <div className="trainings grid md:grid-cols-3 md:px-10 gap-5">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={Cardio} alt="" className="mx-auto rounded lg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <center>Cardio Training</center>
              </div>
              <p className="text-gray-700 text-base">
                Engaging cardio workouts designed to boost cardiovascular
                health.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="bn px-10 py-5">Learn More</button>
            </div>
          </div>

          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={Strength} alt="" className="mx-auto rounded lg" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Strength Training</div>
              <p className="text-gray-700 text-base">
                Access to a variety of strength-building exercises for a
                well-rounded approach.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="bn px-10 py-5">Learn More</button>
            </div>
          </div>

          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={Flex} alt="" className="mx-auto rounded-lg" />
            <div className="px-6 py-4 mb-3">
              <div className="font-bold text-xl mb-2">Flexibility Training</div>
              <p className="text-gray-700 text-base">
                Mindful practices to promote relaxation and balance in both body
                and mind.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="bn px-10 py-5">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-10 bg-gray-900">
        <div className="services mb-8 my-10 grid grid-cols-6">
          <div></div>
          <div className="col-span-4 ser p-5">
            <h1 className="text-5xl font-bold md:ml-5 text-white mt-8">
              Meet the Team.
            </h1>
            <p className="ml-5 mt-5 text-white max-font">
              Our team is more than just a collection of names; we&apos;re a
              dedicated community of fitness enthusiasts, experts, and
              motivators, all united by a common goal—to guide and support you
              on your journey to a healthier lifestyle. Get ready to discover
              the faces behind the inspiration, the experts behind the guidance,
              and the enthusiasts behind the encouragement.
            </p>
          </div>
          <div></div>
          <div></div>
        </div>

        <div className="trainings flex justiify-items-center flex-wrap md:px-10 gap-2">
          <div className="max-w-sm w-full md:w-1/4 rounded overflow-hidden shadow-lg">
            <img className="mx-auto w-32 h-auto" src={Francis} alt="" />
            <div className="px-6 py-4">
              <div className="font-bold text-white text-xl mb-2 flex items-center justify-center ">
                Francis Lagang
              </div>
              <p className="text-white text-base flex items-center justify-center ">
                Chief Executive Officer
              </p>
            </div>
          </div>

          <div className="max-w-sm w-full md:w-1/4 rounded overflow-hidden shadow-lg">
            <img className="mx-auto w-32 h-auto" src={Ceril} alt="" />
            <div className="px-6 py-4">
              <div className="font-bold text-white text-xl mb-2 flex items-center justify-center ">
                Ceril Heyrosa
              </div>
              <p className="text-white text-base flex items-center justify-center ">
                Chief Technology Officer
              </p>
            </div>
          </div>

          <div className="max-w-sm w-full md:w-1/4 rounded overflow-hidden shadow-lg">
            <img className="mx-auto w-32 h-auto" src={Marga} alt="" />
            <div className="px-6 py-4">
              <div className="font-bold text-white text-xl mb-2 flex items-center justify-center ">
                Margaret Docdoc
              </div>
              <p className="text-white text-base flex items-center justify-center ">
                Chief Marketing Officer
              </p>
            </div>
          </div>

          <div className="max-w-sm w-full md:w-1/5 rounded overflow-hidden shadow-lg">
            <img className="mx-auto w-32 h-auto" src={Djen} alt="" />
            <div className="px-6 py-4">
              <div className="flex items-center justify-center font-bold text-white text-xl mb-2">
                Clybel Bonachita
              </div>
              <p className="text-white text-base flex items-center justify-center mb-9">
                Chief Operations Officer
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;

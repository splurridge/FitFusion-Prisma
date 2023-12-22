import Footer from './components/Footer'
import NavBar from './components/NavBar'

import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    <NavBar />
      <div className="bg-gray-900 h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Get the best part of your day. <br />{" "}
            <span className="text-purple-600">You fit here.</span>
          </h1>
          <h6 className="font-light text-lg mb-6">
            We provide serious fitness but within a fun and friendly, safe space.
          </h6>
          <Link to="/signup">
            <button className="font-bold bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
              Join Now
            </button>
          </Link>
        </div>
      </div>

      <div className="choosing my-10 py-2 grid md:grid-cols-6">
        <div></div>

        <div className="col-span-4 ser p-5">
          <h1 className="text-5xl text-gray-900 font-bold md:ml-5">Why Choose Fit Fusion? </h1>
          <p className="ml-5 mt-5 text-slate-00">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum temporibus cum, perferendis illo ab sapiente provident repudiandae impedit maxime ipsa reprehenderit exercitationem iste fugit expedita ut eveniet magni assumenda porro.</p>
        </div>
      </div>

      <div>
        <div className="why-cards md:p-5 md:px-10 text-white grid md:grid-cols-3 gap-10">

          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad6485a1a964d90_Icon%20User.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Great Workout Plans</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>

          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad648c3d2964d8d_Icon%20Diet.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Nutrition & diet</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>

          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad648c429964d8c_Icon%20Shield.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Easy to Use</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>

          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad648e906964d8e_Icon%20Motivation.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Support & motivation</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>
          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad648f22c964d8f_Icon%20Training.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Productive Training</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>

          <div className="why-card bg-gray-900 p-10 rounded-md">
            <div className="whyimg my-5">
              <img src="https://assets.website-files.com/60c1736aaad648491e964d73/60c1736aaad6482d23964d8b_Icon%20Heart.svg" alt="" srcset="" />
            </div>
            <div className="whyTitle my-3 text-purple-700 text-2xl font-bold">
              <h1>Commitment</h1>
            </div>
            <div className="whyinfo text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit velitolm platea libero, ultricies hendrerit.
            </div>
          </div>
        </div>
        </div>
      <Footer />
    </>
  );
}

export default App;
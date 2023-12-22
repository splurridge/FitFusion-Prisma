import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Contact() {

  return (
    <div>
      <Navbar />
      <br/>
      <br/>
      <div className="waiting grid md:grid-cols-10 text-white mt-10">
        <div></div>
        <div className="col-span-8 waiting-card w-full rounded-md">
          <div className="grid md:grid-cols-2">
            <div className="waiting-left-side ">
              <br/>
              <div className="waiting-left p-10 mt-10">
                <h1 className="text-6xl font-bold text-gray-900">
                  What Are You Waiting For?
                </h1>
                <p className="my-5 text-slate-400">
                  We value your input, questions, and feedback, and we&apos;re
                  here to make sure you have the best experience possible.
                  Whether you&apos;re seeking assistance, have inquiries about
                  our services, or simply want to connect, our dedicated support
                  team is ready to lend an ear. Reach out and let us guide you
                  on your journey to health and wellness—because at Fit Fusion,
                  your voice matters.
                </p>
                <button className="rounded-md hover:bg-black hover:text-white bg-gray-900 font-bold text-white px-10 py-5">
                  Contact Us
                </button>
              </div>
            </div>

            <div className="waiting-right">
              <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <form action="#" className="space-y-8">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Let us know how we can help you..."
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer />
    </div>
  );
}

export default Contact;

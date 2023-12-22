import Photo from "../assets/photo.png";

function Profile() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <main className="profile-page">
          <div className="container mx-auto px-4">
            <div className="justify-center mt-5 p-4 border border-gray-300 rounded-lg dark:border-gray-700">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex-wrap justify-center py-6 px-3 mt-2 sm:mt-0">
                    <img
                      src={Photo}
                      alt=""
                      className="rounded-full h-40 w-50 object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    Margaret Grace Docdoc
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Female
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    Fit Fusion Member
                  </div>
                </div>
                <div className="mt-5 py-5 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <button className="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;

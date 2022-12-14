import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { LocaleContext } from "../contexts/Locale.context";
import { getProfile } from "../services/auth.service";
import { getUser } from "../services/user.service";

const User = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    profilePic: "",
    status: "",
    createdOn: "",
  });
  const [since, setSince] = useState({
    day: 1,
    month: 2,
    year: 2000,
  });
  const { auth } = useContext(AuthContext);
  const { $t } = useContext(LocaleContext);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      let res;
      if (id === "me") res = await getProfile();
      else res = await getUser(id);
      setUser(res.data.data);
      const date = new Date(res.data.data.createdOn);
      setSince({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    })();
  }, [id]);

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">22</p>
              <p className="text-gray-400">Friends</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Photos</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {!user.profilePic ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full bg-red-500 z-2"></div>
                </>
              ) : (
                <div className="relative w-42 h-42">
                  <img
                    className="rounded-full border border-gray-100 shadow-sm"
                    src={`http://localhost:1234/uploads/${user.profilePic}`}
                    alt="user"
                  />
                  <div className="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full bg-green-500 z-2"></div>
                </div>
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              disabled={user.id === auth?.user.id}
              className={`${
                user.id === auth?.user.id
                  ? "disabled:opacity-75 disabled:hover:-translate-y-0 disabled:hover:bg-blue-400 cursor-not-allowed"
                  : ""
              } text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
            >
              Connect
            </button>
            <button
              disabled={user.id === auth?.user.id}
              className={`${
                user.id === auth?.user.id
                  ? "disabled:opacity-75 disabled:hover:-translate-y-0 disabled:hover:bg-gray-700 cursor-not-allowed"
                  : ""
              } text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
            >
              Message
            </button>
          </div>
        </div>
        <div className="mt-20 text-center pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {user.name}{" "}
            {user.id === auth?.user.id ? (
              <span className="font-light text-gray-500">(Me)</span>
            ) : (
              ""
            )}
          </h1>
          <h3 className="text-xl font-light text-gray-500">@{user.username}</h3>
          <p className="font-light text-gray-600 mt-3">{user.email}</p>
          <p className="mt-8 text-gray-500">{user.status}</p>
          <p className="mt-2 text-gray-700 font-bold">
            Member since {$t(`months.${since.month}`)} {since.day}, {since.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;

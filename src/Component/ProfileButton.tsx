import { useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { errorMsg } from "./Poperror";

import "react-toastify/dist/ReactToastify.css";
interface ProfileButtonProps {
  id: string;
}

export default function ProfileButton({ id }: ProfileButtonProps) {
  const userId = useUserContext();
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequest, setFriendRequest] = useState(false);
  const [checkButton, setCheckButton] = useState(false);
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (id && id !== userId?.id?.toString()) {
      axios
        .get(`${process.env.SERVER_HOST}/api/v1/user/isFriend?otherId=${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsFriend(response.data);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          } else {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
          }
        });

      axios
        .get(
          `${process.env.SERVER_HOST}/api/v1/user/isFriendRequestSent?otherId=${id}`
        )
        .then((response) => {
          setFriendRequest(response.data);
          setCheckButton(true);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/login");
          } else {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            errorMsg(errorMessage);
          }
        });
    }
  }, [render]);

  const handleBlock = () => {
    axios
      .post(
        `${process.env.SERVER_HOST}/api/v1/user/ban?userToBanId=${id}`,
        null,
        { withCredentials: true }
      )
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          errorMsg(errorMessage);
        }
      });
  };

  const handleUnfriend = () => {
    axios
      .delete(
        `${process.env.SERVER_HOST}/api/v1/user/removeFriend?friendId=${id}`,
        { withCredentials: true }
      )
      .then(() => {
        setRender((prevState) => !prevState);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
         errorMsg(errorMessage);
        }
      });
  };

  const handleCancelRequest = () => {
    axios
      .delete(
        `${process.env.SERVER_HOST}/api/v1/user/friendRequest/sent?reciverId=${id}`,
        { withCredentials: true }
      )
      .then(() => {
        setRender((prevState) => !prevState);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          errorMsg(errorMessage);
        }
      });
  };

  const handleAddFriend = () => {
    axios
      .post(
        `${process.env.SERVER_HOST}/api/v1/user/friendRequest?userToSendToId=${id}`,
        null,
        { withCredentials: true }
      )
      .then(() => {
        setRender((prevState) => !prevState);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          errorMsg(errorMessage);
        }
      });
  };

  return (
    id &&
    typeof id === "string" &&
    id !== userId?.id?.toString() && (
      <div>
        {checkButton ? (
          <>
            {!isFriend ? (
              <div className="flex gap-3 text-white iphone:text-[12px] tablet:text-[15px] laptop:text-[18px] imac:text-[20px]">
                {friendRequest ? (
                  <button
                    className="bg-NavBarroundedIcon rounded-xl iphone:w-[100px] laptop:w-[150px] px-2"
                    onClick={handleCancelRequest}
                  >
                    Cancel Request
                  </button>
                ) : (
                  <button
                    className="bg-NavBarroundedIcon rounded-xl iphone:w-[100px] laptop:w-[150px] px-2"
                    onClick={handleAddFriend}
                  >
                    Add friend
                  </button>
                )}
                <button
                  className="bg-NavBarroundedIcon rounded-xl iphone:w-[100px] laptop:w-[150px]"
                  onClick={handleBlock}
                >
                  Block
                </button>
              </div>
            ) : (
              <div className="flex gap-3 text-white iphone:text-[12px] tablet:text-[15px] laptop:text-[18px] imac:text-[20px]">
                <button
                  className="bg-NavBarroundedIcon rounded-xl iphone:w-[100px] laptop:w-[150px] px-2"
                  onClick={handleUnfriend}
                >
                  Unfriend
                </button>
                <button
                  className="bg-NavBarroundedIcon rounded-xl iphone:w-[100px] laptop:w-[150px] px-2"
                  onClick={handleBlock}
                >
                  Block
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    )
  );
}

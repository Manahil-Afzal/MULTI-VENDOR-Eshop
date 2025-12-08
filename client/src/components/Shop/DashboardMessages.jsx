import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import  socketIO  from "socket.io-client";
import { backend_url } from "../../server";


const socket = socketIO("http://localhost:4000", {
  transports: ["websocket"],
});


const DashboardMessages = () => {
  const { sellers, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);


 useEffect(() => {
     socket.on("getMessage", (data) => {
       setArrivalMessage({
         sender: data.senderId,
         text: data.text,
         createdAt: Date.now(),
       });
     });
   }, []);


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


 useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-seller/${sellers._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sellers]);


  useEffect(() => {
    if (sellers) {
      const sellerId = sellers?._id;
      socket.emit("addUser", sellerId);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [sellers]);


const onlineCheck = (chat) => {
    if (!chat?.members) return false;
    if (!onlineUsers || !Array.isArray(onlineUsers)) return false;

    const chatMemberId = chat.members.find((id) => id !== sellers._id);

    const isOnline = onlineUsers.some((u) => u.userId === chatMemberId);

    return isOnline;
  };

  useEffect(() => {
    if (currentChat && Array.isArray(onlineUsers)) {
      const otherUserId = currentChat.members.find((id) => id !== sellers._id);

      const isOnline = onlineUsers.some((u) => u.userId === otherUserId);

      setActiveStatus(isOnline);
    }
  }, [currentChat, onlineUsers]);


  useEffect(() => {
    if (!currentChat?._id) return;

    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: sellers._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== sellers._id);

    socket.emit("sendMessage", {
      senderId: sellers._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: sellers._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: sellers._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== sellers._id
    );

    socket.emit("sendMessage", {
      senderId: sellers._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, {
          images: e,
          sender: sellers._id,
          text: newMessage,
          conversationId: currentChat._id,
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: sellers._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (userData) {
      console.log("User Data:", userData);
      console.log("User Avatar:", userData.avatar);
      console.log("Full Avatar URL:", `${backend_url}/uploads/${userData.avatar}`);
    }
  }, [userData]);


  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>


          {conversations ? (
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={sellers._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
              />
            ))
          ) : (
            <p className="text-center py-5">No conversations found</p>
          )}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={sellers._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  isLoading
}) => {
  // const [user, setUser] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  // useEffect(() => {
  //   const userId = data.members.find((user) => user != me);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get(`${server}/user/user-info/${userId}`);
  //       setUser(res.data.user);
  //       console.log("USER DATA:", res.data.user);
  //       console.log("USER AVATAR:", res.data.user?.avatar);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, [me, data]);

 useEffect(() => {
  const userId = data.members.find((member) => member !== me);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token"); 

      const res = await axios.get(`${server}/user/user-info/${userId}`, {
        withCredentials: true, 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUser(res.data.user || null);
    } catch (error) {
      console.log(error);
    }
  };

  getUser();
}, [me, data]);


  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"
        }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />


        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#F2A533] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== user?._id
            ? "You:"
            : data.groupTitle}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "online" : "offline"}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"
                  }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.images && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  />
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                        } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;








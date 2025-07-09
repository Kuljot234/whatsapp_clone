"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Video, Mic, MicOff, PhoneOff, Wifi, Battery, Signal, Plus } from "lucide-react"

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  avatar: string
  hasStatus?: boolean
}

interface Status {
  id: string
  name: string
  avatar: string
  time: string
  viewed: boolean
}

interface Notification {
  id: string
  type: "message" | "call"
  title: string
  body: string
  chatId: string
  timestamp: string
  callType?: "voice" | "video"
}

export default function WhatsAppPreview() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "chat" | "call" | "status">("home")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [callDuration, setCallDuration] = useState(0)
  const [isCallActive, setIsCallActive] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [activeTab, setActiveTab] = useState<"chats" | "status">("chats")

  const [statuses] = useState<Status[]>([
    { id: "1", name: "Arjun Sharma", avatar: "AS", time: "2 minutes ago", viewed: false },
    { id: "2", name: "Priya Patel", avatar: "PP", time: "15 minutes ago", viewed: true },
    { id: "3", name: "Sneha Gupta", avatar: "SG", time: "1 hour ago", viewed: false },
    { id: "4", name: "Vikram Singh", avatar: "VS", time: "3 hours ago", viewed: true },
    { id: "5", name: "Ananya Reddy", avatar: "AR", time: "5 hours ago", viewed: false },
    { id: "6", name: "Karan Mehta", avatar: "KM", time: "Yesterday", viewed: true },
  ])

  const [chatMessages, setChatMessages] = useState<{
    [chatId: string]: Array<{ id: string; text: string; sender: "me" | "other"; timestamp: string }>
  }>({
    "1": [
      { id: "1", text: "Hello! How are you?", sender: "other", timestamp: "10:30 AM" },
      { id: "2", text: "I'm doing great! What about you?", sender: "me", timestamp: "10:32 AM" },
      { id: "3", text: "Same here! What are you doing today?", sender: "other", timestamp: "10:35 AM" },
      { id: "4", text: "Just working from home. You?", sender: "me", timestamp: "10:37 AM" },
      { id: "5", text: "Planning to go out for shopping", sender: "other", timestamp: "10:40 AM" },
    ],
    "2": [
      { id: "6", text: "Hi Priya! How was your day?", sender: "me", timestamp: "9:10 AM" },
      { id: "7", text: "It was good! Had a busy day at office", sender: "other", timestamp: "9:15 AM" },
      { id: "8", text: "What are you doing now?", sender: "me", timestamp: "9:17 AM" },
      { id: "9", text: "Just relaxing at home. You?", sender: "other", timestamp: "9:20 AM" },
    ],
    "3": [
      { id: "10", text: "Hey! What's up?", sender: "other", timestamp: "8:45 AM" },
      { id: "11", text: "Nothing much, just chilling. How are you?", sender: "me", timestamp: "8:46 AM" },
      { id: "12", text: "I'm good! What are you doing this weekend?", sender: "other", timestamp: "8:48 AM" },
      { id: "13", text: "Thinking of watching a movie. Any suggestions?", sender: "me", timestamp: "8:50 AM" },
    ],
    "4": [
      { id: "14", text: "Hello! How are you doing?", sender: "other", timestamp: "Yesterday" },
      { id: "15", text: "I'm fine! What about you?", sender: "me", timestamp: "Yesterday" },
      { id: "16", text: "All good! What are you up to?", sender: "other", timestamp: "Yesterday" },
      { id: "17", text: "Just finished my work. Free now!", sender: "me", timestamp: "Yesterday" },
      { id: "18", text: "That's great! Want to hang out?", sender: "other", timestamp: "Yesterday" },
    ],
    "5": [
      { id: "19", text: "Hi! How's everything going?", sender: "other", timestamp: "Yesterday" },
      { id: "20", text: "Everything's good! How are you?", sender: "me", timestamp: "Yesterday" },
      { id: "21", text: "I'm doing well. What are you doing?", sender: "other", timestamp: "Yesterday" },
      { id: "22", text: "Just having dinner. You?", sender: "me", timestamp: "Yesterday" },
    ],
    "6": [
      { id: "23", text: "Hey there! How are you?", sender: "other", timestamp: "2 days ago" },
      { id: "24", text: "I'm great! Thanks for asking. You?", sender: "me", timestamp: "2 days ago" },
      { id: "25", text: "I'm good too! What are you doing?", sender: "other", timestamp: "2 days ago" },
      { id: "26", text: "Reading a book. What about you?", sender: "me", timestamp: "2 days ago" },
      { id: "27", text: "Watching Netflix 😊", sender: "other", timestamp: "2 days ago" },
    ],
    "7": [
      { id: "28", text: "Hello! What's going on?", sender: "other", timestamp: "2 days ago" },
      { id: "29", text: "Hey! Nothing much, just relaxing. You?", sender: "me", timestamp: "2 days ago" },
      { id: "30", text: "Same here! How was your day?", sender: "other", timestamp: "2 days ago" },
      { id: "31", text: "It was productive! Got a lot done", sender: "me", timestamp: "2 days ago" },
    ],
    "8": [
      { id: "32", text: "Hi! How are you feeling today?", sender: "other", timestamp: "3 days ago" },
      { id: "33", text: "I'm feeling great! How about you?", sender: "me", timestamp: "3 days ago" },
      { id: "34", text: "I'm good! What are you doing?", sender: "other", timestamp: "3 days ago" },
      { id: "35", text: "Studying for my exams. You?", sender: "me", timestamp: "3 days ago" },
      { id: "36", text: "Working on a project", sender: "other", timestamp: "3 days ago" },
    ],
    "9": [
      { id: "37", text: "Hey! How's it going?", sender: "other", timestamp: "3 days ago" },
      { id: "38", text: "Going well! How are you doing?", sender: "me", timestamp: "3 days ago" },
      { id: "39", text: "I'm doing fine! What are you up to?", sender: "other", timestamp: "3 days ago" },
      { id: "40", text: "Just finished my workout. Feeling good!", sender: "me", timestamp: "3 days ago" },
    ],
    "10": [
      { id: "41", text: "Hello! How are you today?", sender: "other", timestamp: "1 week ago" },
      { id: "42", text: "I'm doing well! Thanks. How about you?", sender: "me", timestamp: "1 week ago" },
      { id: "43", text: "I'm good too! What are you doing?", sender: "other", timestamp: "1 week ago" },
      { id: "44", text: "Just got back from a walk. You?", sender: "me", timestamp: "1 week ago" },
      { id: "45", text: "Cooking dinner right now", sender: "other", timestamp: "1 week ago" },
    ],
  })

  const [newMessage, setNewMessage] = useState("")

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Arjun Sharma",
      lastMessage: "Planning to go out for shopping",
      timestamp: "10:40 AM",
      unreadCount: 2,
      avatar: "AS",
      hasStatus: true,
    },
    {
      id: "2",
      name: "Priya Patel",
      lastMessage: "Just relaxing at home. You?",
      timestamp: "9:20 AM",
      unreadCount: 0,
      avatar: "PP",
      hasStatus: true,
    },
    {
      id: "3",
      name: "Rahul Kumar",
      lastMessage: "Thinking of watching a movie. Any suggestions?",
      timestamp: "8:50 AM",
      unreadCount: 1,
      avatar: "RK",
      hasStatus: false,
    },
    {
      id: "4",
      name: "Sneha Gupta",
      lastMessage: "That's great! Want to hang out?",
      timestamp: "Yesterday",
      unreadCount: 3,
      avatar: "SG",
      hasStatus: true,
    },
    {
      id: "5",
      name: "Vikram Singh",
      lastMessage: "Just having dinner. You?",
      timestamp: "Yesterday",
      unreadCount: 0,
      avatar: "VS",
      hasStatus: true,
    },
    {
      id: "6",
      name: "Ananya Reddy",
      lastMessage: "Watching Netflix 😊",
      timestamp: "2 days ago",
      unreadCount: 1,
      avatar: "AR",
      hasStatus: true,
    },
    {
      id: "7",
      name: "Karan Mehta",
      lastMessage: "It was productive! Got a lot done",
      timestamp: "2 days ago",
      unreadCount: 0,
      avatar: "KM",
      hasStatus: true,
    },
    {
      id: "8",
      name: "Riya Joshi",
      lastMessage: "Working on a project",
      timestamp: "3 days ago",
      unreadCount: 2,
      avatar: "RJ",
      hasStatus: false,
    },
    {
      id: "9",
      name: "Amit Agarwal",
      lastMessage: "Just finished my workout. Feeling good!",
      timestamp: "3 days ago",
      unreadCount: 0,
      avatar: "AA",
      hasStatus: false,
    },
    {
      id: "10",
      name: "Pooja Nair",
      lastMessage: "Cooking dinner right now",
      timestamp: "1 week ago",
      unreadCount: 1,
      avatar: "PN",
      hasStatus: false,
    },
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  useEffect(() => {
    // Update chat list with latest messages
    setChats((prevChats) =>
      prevChats.map((chat) => {
        const messages = chatMessages[chat.id] || []
        const lastMessage = messages[messages.length - 1]
        if (lastMessage) {
          return {
            ...chat,
            lastMessage: lastMessage.text,
            timestamp: lastMessage.timestamp,
          }
        }
        return chat
      }),
    )
  }, [chatMessages])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const simulateNotification = (type: "message" | "call", callType?: "voice" | "video") => {
    const chat = chats[Math.floor(Math.random() * chats.length)]
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title: type === "call" ? "Incoming Call" : "New Message",
      body: type === "call" ? `${callType} call from ${chat.name}` : `${chat.name}: Hello there!`,
      chatId: chat.id,
      timestamp: new Date().toLocaleTimeString(),
      callType,
    }

    setNotifications((prev) => [notification, ...prev])

    // Show browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.body,
        icon: "/placeholder.svg?height=64&width=64",
      })
    }

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 5000)
  }

  const handleNotificationClick = (notification: Notification) => {
    const chat = chats.find((c) => c.id === notification.chatId)
    if (chat) {
      setSelectedChat(chat)
      if (notification.type === "call") {
        setCurrentScreen("call")
        setIsCallActive(true)
        setCallDuration(0)
      } else {
        setCurrentScreen("chat")
      }
    }
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
  }

  const endCall = () => {
    setIsCallActive(false)
    setCurrentScreen("home")
    setCallDuration(0)
  }

  const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto" style={{ width: "375px", height: "812px" }}>
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-11 bg-green-600 flex items-center justify-between px-6 text-white text-sm z-50">
            <div className="flex items-center gap-1">
              <span className="font-medium">9:41</span>
            </div>
            <div className="flex items-center gap-1">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="pt-11 h-full">{children}</div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  )

  const renderStatusSection = () => (
    <div className="p-4 border-b bg-gray-50">
      <h3 className="font-semibold text-sm mb-3">Status</h3>

      {/* My Status */}
      <div className="flex items-center mb-4 cursor-pointer">
        <div className="relative">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
            ME
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">My Status</h4>
          <p className="text-xs text-gray-600">Tap to add status update</p>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="space-y-3">
        <p className="text-xs text-gray-500 font-medium">Recent updates</p>
        {statuses.slice(0, 3).map((status) => (
          <div key={status.id} className="flex items-center cursor-pointer">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm border-2 ${
                status.viewed ? "border-gray-300 bg-gray-400" : "border-green-500 bg-green-500"
              }`}
            >
              {status.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{status.name}</h4>
              <p className="text-xs text-gray-600">{status.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHomeScreen = () => (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">WhatsApp</h1>
        <div className="flex mt-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-white hover:bg-green-700 mr-4 ${activeTab === "chats" ? "bg-green-700" : ""}`}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-white hover:bg-green-700 ${activeTab === "status" ? "bg-green-700" : ""}`}
            onClick={() => setActiveTab("status")}
          >
            Status
          </Button>
        </div>
      </div>

      {/* Active Notifications */}
      {notifications.length > 0 && (
        <div className="p-4 bg-yellow-50 border-b">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
            <Badge variant="destructive">{notifications.length}</Badge>
            Active Notifications
          </h3>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-2">
                  <div className="flex items-center gap-2">
                    {notification.type === "call" ? (
                      <div className="p-1 bg-green-100 rounded-full">
                        {notification.callType === "video" ? (
                          <Video className="w-3 h-3 text-green-600" />
                        ) : (
                          <Phone className="w-3 h-3 text-green-600" />
                        )}
                      </div>
                    ) : (
                      <div className="p-1 bg-blue-100 rounded-full">
                        <MessageCircle className="w-3 h-3 text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-xs">{notification.title}</p>
                      <p className="text-xs text-gray-600 truncate">{notification.body}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Status Section */}
      {activeTab === "status" && renderStatusSection()}

      {/* Chat List or Status List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "chats" ? (
          <>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedChat(chat)
                  setCurrentScreen("chat")
                }}
              >
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm ${
                      chat.hasStatus ? "border-2 border-green-500 bg-green-500" : "bg-green-500"
                    }`}
                  >
                    {chat.avatar}
                  </div>
                  {chat.hasStatus && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <Badge variant="default" className="bg-green-500 ml-2 text-xs">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-3">Viewed updates</h3>
            <div className="space-y-3">
              {statuses.slice(3).map((status) => (
                <div key={status.id} className="flex items-center cursor-pointer">
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm border-2 border-gray-300">
                    {status.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{status.name}</h4>
                    <p className="text-xs text-gray-600">{status.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Test Buttons */}
      <div className="p-3 bg-gray-50 space-y-2">
        <h3 className="font-semibold text-xs mb-2">Test Notifications:</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => simulateNotification("message")} variant="outline" size="sm" className="text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            Message
          </Button>
          <Button onClick={() => simulateNotification("call", "voice")} variant="outline" size="sm" className="text-xs">
            <Phone className="w-3 h-3 mr-1" />
            Voice
          </Button>
          <Button
            onClick={() => simulateNotification("call", "video")}
            variant="outline"
            size="sm"
            className="col-span-2 text-xs"
          >
            <Video className="w-3 h-3 mr-1" />
            Video Call
          </Button>
        </div>
      </div>
    </div>
  )

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), message],
    }))

    setNewMessage("")

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "That sounds great!",
        "I'm doing well, thanks!",
        "How about you?",
        "What are you up to?",
        "That's awesome!",
        "I'm just relaxing",
        "Same here!",
        "Sounds good to me!",
        "How was your day?",
        "I'm free now",
        "Let's catch up soon!",
        "That's interesting!",
      ]

      const autoReply = {
        id: (Date.now() + 1).toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: "other" as const,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), autoReply],
      }))
    }, 2000)
  }

  const renderChatScreen = () => {
    const messages = chatMessages[selectedChat?.id || ""] || []

    return (
      <div className="h-full bg-white flex flex-col">
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen("home")}
            className="text-white hover:bg-green-700 mr-2 p-1"
          >
            ←
          </Button>
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold mr-2">
            {selectedChat?.avatar}
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-sm">{selectedChat?.name}</h2>
            <p className="text-xs opacity-90">Online</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-700 p-1"
              onClick={() => {
                setCurrentScreen("call")
                setIsCallActive(true)
                setCallDuration(0)
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-700 p-1"
              onClick={() => {
                setCurrentScreen("call")
                setIsCallActive(true)
                setCallDuration(0)
              }}
            >
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 space-y-3 whatsapp-bg overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-2 rounded-lg max-w-xs shadow-sm ${
                  message.sender === "me" ? "bg-green-500 text-white" : "bg-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "me" ? "opacity-90" : "text-gray-500"}`}>
                  {message.timestamp} {message.sender === "me" ? "✓✓" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 bg-white border-t">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-full px-3 text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              size="sm"
              className="rounded-full bg-green-500 hover:bg-green-600 p-2"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderCallScreen = () => (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Call Info */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {selectedChat?.avatar}
        </div>
        <h2 className="text-xl font-bold mb-2">{selectedChat?.name}</h2>
        <p className="text-gray-300 mb-1 text-sm">{isCallActive ? formatDuration(callDuration) : "Connecting..."}</p>
        <p className="text-gray-400 text-sm">Voice Call</p>
      </div>

      {/* Call Controls */}
      <div className="p-6">
        <div className="flex justify-center items-center gap-6">
          <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 p-0">
            <MicOff className="w-5 h-5" />
          </Button>

          <Button onClick={endCall} size="lg" className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 p-0">
            <PhoneOff className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 p-0">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="chat-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Chat bubbles */}
              <circle cx="20" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M15 25 Q20 20 25 25" fill="none" stroke="currentColor" strokeWidth="1" />

              {/* Phone icons */}
              <rect x="40" y="15" width="8" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="44" cy="30" r="1" fill="currentColor" />

              {/* Message icons */}
              <rect x="60" y="40" width="15" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
              <line x1="63" y1="43" x2="72" y2="43" stroke="currentColor" strokeWidth="1" />
              <line x1="63" y1="46" x2="69" y2="46" stroke="currentColor" strokeWidth="1" />

              {/* Heart */}
              <path
                d="M10 60 C10 55, 20 55, 20 60 C20 55, 30 55, 30 60 C30 65, 20 75, 20 75 C20 75, 10 65, 10 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />

              {/* Emoji */}
              <circle cx="80" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="77" cy="18" r="1" fill="currentColor" />
              <circle cx="83" cy="18" r="1" fill="currentColor" />
              <path d="M76 22 Q80 25 84 22" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chat-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">WhatsApp-Style Notifications</h1>
          <p className="text-gray-600">React Native App Preview - Mobile Frame</p>
        </div>

        <PhoneFrame>
          {currentScreen === "home" && renderHomeScreen()}
          {currentScreen === "chat" && renderChatScreen()}
          {currentScreen === "call" && renderCallScreen()}
        </PhoneFrame>
      </div>

      <style jsx>{`
        .whatsapp-bg {
          background-color: #e5ddd5;
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 50%),
            radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 50%);
          background-size: 100px 100px;
        }
      `}</style>
    </div>
  )
}

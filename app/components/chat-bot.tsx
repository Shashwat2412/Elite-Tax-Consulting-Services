





// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { MessageCircle, X, Send, Bot, User } from "lucide-react"

// interface Message {
//   id: string
//   text: string
//   sender: "user" | "bot"
//   timestamp: Date
//   isQuickReply?: boolean
// }

// interface UserData {
//   name?: string
//   contact?: string
//   email?: string
//   service?: string
//   requirement?: string
// }

// export function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [currentStep, setCurrentStep] = useState("greeting")
//   const [userData, setUserData] = useState<UserData>({})
//   const [messages, setMessages] = useState<Message[]>([])
//   const [inputMessage, setInputMessage] = useState("")
//   const [isWaitingForInput, setIsWaitingForInput] = useState(false)
//   const [sessionId] = useState(`chat_${Date.now()}`)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const serviceOptions = [
//     { key: "personal-tax", label: "🧾 Personal Tax Services", emoji: "🧾" },
//     { key: "business-tax", label: "🏢 Business Tax Services", emoji: "🏢" },
//     { key: "immigration-visa", label: "🌎 Immigration & Visa Services", emoji: "🌎" },
//     { key: "uscis-forms", label: "📄 USCIS & Immigration Forms", emoji: "📄" },
//     { key: "legal-documents", label: "📋 Legal & Documentation Services", emoji: "📋" },
//     { key: "business-services", label: "🏗️ Business & Corporate Services", emoji: "🏗️" },
//     { key: "trucking-services", label: "🚚 Trucking Compliance & Setup", emoji: "🚚" },
//     { key: "other", label: "❓ Something Else / Not Sure", emoji: "❓" },
//   ]

//   const timeSlots = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//   ]

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const initializeChat = () => {
//     if (messages.length === 0) {
//       const welcomeMessage: Message = {
//         id: "welcome",
//         text: "👋 Hi there! Welcome to **Elite Tax Consulting Services**!\n\nI'm here to help you get started. What type of service are you looking for today?",
//         sender: "bot",
//         timestamp: new Date(),
//         isQuickReply: true,
//       }
//       setMessages([welcomeMessage])
//     }
//   }

//   const addMessage = (text: string, sender: "user" | "bot", isQuickReply = false) => {
//     const message: Message = {
//       id: Date.now().toString(),
//       text,
//       sender,
//       timestamp: new Date(),
//       isQuickReply,
//     }
//     setMessages((prev) => [...prev, message])
//     return message
//   }

//   const handleSendMessage = async (messageText?: string) => {
//     const text = messageText || inputMessage.trim()
//     if (!text || isProcessing) return

//     setIsProcessing(true)
//     addMessage(text, "user")
//     setInputMessage("")

//     // Add typing indicator
//     setTimeout(() => {
//       handleBotResponse(text)
//     }, 1000)
//   }

//   const handleBotResponse = async (userInput: string) => {
//     let botResponse = ""
//     let nextStep = currentStep
//     let isQuickReply = false

//     try {
//       switch (currentStep) {
//         case "greeting":
//           const selectedService = serviceOptions.find(
//             (service) =>
//               userInput.toLowerCase().includes(service.key) ||
//               userInput.toLowerCase().includes(service.label.toLowerCase()) ||
//               userInput === service.label,
//           )

//           if (selectedService) {
//             setUserData((prev) => ({ ...prev, service: selectedService.label }))
//             botResponse = `Great choice! You've selected **${selectedService.label}** ${selectedService.emoji}\n\nTo help you better, I'll need some quick details:\n\n📝 **Please provide:**\n• Your name\n• Best contact (phone or email)\n• Brief description of what you need\n\n*You can type it all in one message or separate lines*`
//             nextStep = "lead-capture"
//             setIsWaitingForInput(true)
//           } else {
//             botResponse =
//               "I'd love to help! Please select one of the services from the options above, or tell me what you're looking for. 😊"
//             isQuickReply = true
//           }
//           break

//         case "lead-capture":
//           // Smart parsing of user input
//           const lines = userInput
//             .split(/\n|,|\|/)
//             .map((line) => line.trim())
//             .filter((line) => line.length > 0)

//           let name = "",
//             contact = "",
//             requirement = ""

//           if (lines.length >= 2) {
//             name = lines[0].replace(/^(name:?|i'm|my name is)/i, "").trim()
//             contact = lines[1].replace(/^(contact:?|phone:?|email:?)/i, "").trim()
//             requirement = lines
//               .slice(2)
//               .join(" ")
//               .replace(/^(need:?|requirement:?|looking for:?)/i, "")
//               .trim()
//           } else if (lines.length === 1) {
//             // Try to extract email or phone from single line
//             const emailMatch = userInput.match(/[\w.-]+@[\w.-]+\.\w+/)
//             const phoneMatch = userInput.match(/[\d\s\-$$$$]{10,}/)

//             if (emailMatch || phoneMatch) {
//               contact = emailMatch?.[0] || phoneMatch?.[0] || ""
//               name = userInput
//                 .replace(contact, "")
//                 .replace(/contact:?|email:?|phone:?/gi, "")
//                 .trim()
//             } else {
//               name = userInput
//             }
//           }

//           if (name && (contact || lines.length >= 2)) {
//             setUserData((prev) => ({
//               ...prev,
//               name: name,
//               contact: contact,
//               requirement: requirement,
//               email: contact.includes("@") ? contact : "",
//             }))

//             botResponse = `Perfect! Thanks **${name}** ✅\n\nI've got your details:\n• **Service:** ${userData.service}\n• **Contact:** ${contact}\n${requirement ? `• **Need:** ${requirement}` : ""}\n\n📅 **Would you like to schedule a FREE consultation call?**\n\nOur tax & business experts can discuss your needs in detail!`
//             nextStep = "appointment-choice"
//             setIsWaitingForInput(false)
//             isQuickReply = true

//             // Save lead data immediately
//             saveChatData({
//               name,
//               contact,
//               requirement,
//               service: userData.service,
//               status: "lead_captured",
//             })
//           } else {
//             botResponse = `I need a bit more info to help you! 😊\n\nPlease share:\n• **Your name**\n• **Phone number or email**\n• **What you need help with**\n\n*Example: John Smith, john@email.com, need help with business taxes*`
//           }
//           break

//         case "appointment-choice":
//           if (
//             userInput.toLowerCase().includes("yes") ||
//             userInput.includes("📅 Yes") ||
//             userInput.toLowerCase().includes("schedule")
//           ) {
//             botResponse =
//               "Excellent! 🎉\n\n**Choose your preferred time slot:**\n\n*All times are EST and meetings are 60 minutes*"
//             nextStep = "appointment-time"
//             isQuickReply = true
//           } else if (
//             userInput.toLowerCase().includes("no") ||
//             userInput.includes("⏳ No") ||
//             userInput.toLowerCase().includes("later")
//           ) {
//             botResponse = `No problem, **${userData.name}**! 👍\n\nOur team will review your request and contact you within **24 hours**.\n\n📧 You'll receive a confirmation email shortly.\n\nThanks for choosing **Elite Tax Consulting**! Have a great day! 😊`
//             nextStep = "completed"

//             // Save final data
//             saveChatData({
//               ...userData,
//               status: "no_appointment_requested",
//             })
//           } else {
//             botResponse =
//               "Would you like to schedule a consultation call? Please choose:\n\n📅 **Yes, let's schedule it!**\n⏳ **No, contact me later**"
//             isQuickReply = true
//           }
//           break

//         case "appointment-time":
//           const selectedTime = timeSlots.find((time) => userInput.includes(time))
//           if (selectedTime) {
//             const appointmentDate = new Date()
//             appointmentDate.setDate(appointmentDate.getDate() + 1) // Next day

//             botResponse = `🎉 **Consultation Booked Successfully!**\n\n📅 **Date:** ${appointmentDate.toDateString()}\n⏰ **Time:** ${selectedTime} EST\n👤 **With:** Elite Tax Expert\n📞 **Duration:** 60 minutes\n\n✅ **Confirmation email sent!**\n📧 **Google Meet link included**\n\nWe're excited to help you with your ${userData.service?.toLowerCase()}!\n\nSee you soon! 😊`
//             nextStep = "completed"

//             // Book the appointment
//             bookAppointment(appointmentDate.toISOString().split("T")[0], selectedTime)

//             // Save final data
//             saveChatData({
//               ...userData,
//               appointmentDate: appointmentDate.toISOString().split("T")[0],
//               appointmentTime: selectedTime,
//               status: "appointment_booked",
//             })
//           } else {
//             botResponse = "Please select one of the available time slots above. ⏰"
//             isQuickReply = true
//           }
//           break

//         default:
//           botResponse =
//             "Thanks for chatting with us! If you need anything else, feel free to start a new conversation. 😊"
//       }

//       addMessage(botResponse, "bot", isQuickReply)
//       setCurrentStep(nextStep)
//     } catch (error) {
//       console.error("Chat error:", error)
//       addMessage(
//         "I apologize, but I'm having a technical issue. Please try again or contact us directly at (555) 123-4567. 😊",
//         "bot",
//       )
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const saveChatData = async (data: any) => {
//     try {
//       const chatData = {
//         sessionId,
//         service: data.service,
//         name: data.name,
//         contact: data.contact,
//         requirement: data.requirement,
//         appointmentDate: data.appointmentDate,
//         appointmentTime: data.appointmentTime,
//         status: data.status,
//         messages: messages,
//         timestamp: new Date().toISOString(),
//       }

//       const response = await fetch("/api/chat/save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(chatData),
//       })

//       if (response.ok) {
//         console.log("Chat data saved successfully")
//       }
//     } catch (error) {
//       console.error("Error saving chat data:", error)
//     }
//   }

//   const bookAppointment = async (date: string, time: string) => {
//     try {
//       const response = await fetch("/api/calendar/book", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userData,
//           appointmentDate: date,
//           appointmentTime: time,
//         }),
//       })

//       if (response.ok) {
//         console.log("Appointment booked successfully")
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error)
//     }
//   }

//   const handleQuickReply = (option: string) => {
//     handleSendMessage(option)
//   }

//   const renderQuickReplies = () => {
//     if (currentStep === "greeting" && messages[messages.length - 1]?.isQuickReply) {
//       return (
//         <div className="grid grid-cols-1 gap-2 mb-3">
//           {serviceOptions.map((service) => (
//             <Button
//               key={service.key}
//               variant="outline"
//               size="sm"
//               onClick={() => handleQuickReply(service.label)}
//               className="text-xs h-auto py-2 px-3 justify-start text-left hover:bg-blue-50 border-blue-200"
//             >
//               <span className="mr-2">{service.emoji}</span>
//               {service.label.replace(service.emoji, "").trim()}
//             </Button>
//           ))}
//         </div>
//       )
//     }

//     if (currentStep === "appointment-choice" && messages[messages.length - 1]?.isQuickReply) {
//       return (
//         <div className="flex flex-col gap-2 mb-3">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleQuickReply("📅 Yes, let's schedule it!")}
//             className="text-sm h-auto py-3 px-4 bg-green-50 border-green-200 hover:bg-green-100"
//           >
//             📅 Yes, let's schedule it!
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleQuickReply("⏳ No, contact me later")}
//             className="text-sm h-auto py-3 px-4 bg-gray-50 border-gray-200 hover:bg-gray-100"
//           >
//             ⏳ No, contact me later
//           </Button>
//         </div>
//       )
//     }

//     if (currentStep === "appointment-time" && messages[messages.length - 1]?.isQuickReply) {
//       return (
//         <div className="grid grid-cols-2 gap-2 mb-3">
//           {timeSlots.map((time) => (
//             <Button
//               key={time}
//               variant="outline"
//               size="sm"
//               onClick={() => handleQuickReply(time)}
//               className="text-xs h-8 px-2 hover:bg-blue-50 border-blue-200"
//             >
//               {time}
//             </Button>
//           ))}
//         </div>
//       )
//     }

//     return null
//   }

//   const formatMessageText = (text: string) => {
//     // Convert markdown-style formatting to HTML
//     return text
//       .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//       .replace(/\*(.*?)\*/g, "<em>$1</em>")
//       .replace(/\n/g, "<br>")
//   }

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <div className="fixed right-4 bottom-20 z-50">
//         <div className="relative">
//           <Button
//             onClick={() => {
//               setIsOpen(!isOpen)
//               if (!isOpen) initializeChat()
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse-slow"
//             size="lg"
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//             <span className="sr-only">Open chat</span>
//           </Button>

//           {/* Notification Badge */}
//           {!isOpen && (
//             <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
//               💬
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed right-4 bottom-36 z-50 w-80 md:w-96 max-h-[600px] shadow-2xl">
//           <Card className="border-0 bg-white overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
//               <CardTitle className="flex items-center justify-between text-lg">
//                 <div className="flex items-center space-x-2">
//                   <div className="bg-white/20 rounded-full p-2">
//                     <Bot className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <div className="font-bold">Elite Tax Assistant</div>
//                     <div className="text-xs text-blue-100">Online • Ready to help</div>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setIsOpen(false)}
//                   className="text-white hover:bg-white/20 p-1"
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="p-0 flex flex-col h-[500px]">
//               {/* Messages Area */}
//               <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar bg-gray-50">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
//                         message.sender === "user"
//                           ? "bg-blue-600 text-white rounded-br-md"
//                           : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
//                       }`}
//                     >
//                       <div className="flex items-center mb-1">
//                         {message.sender === "bot" ? (
//                           <Bot className="h-3 w-3 mr-1 text-blue-600" />
//                         ) : (
//                           <User className="h-3 w-3 mr-1 text-blue-100" />
//                         )}
//                         <span className="text-xs opacity-75">
//                           {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                         </span>
//                       </div>
//                       <div
//                         className="text-sm leading-relaxed"
//                         dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 {/* Typing Indicator */}
//                 {isProcessing && (
//                   <div className="flex justify-start">
//                     <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
//                       <div className="flex items-center space-x-1">
//                         <Bot className="h-3 w-3 text-blue-600" />
//                         <div className="flex space-x-1">
//                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.1s" }}
//                           ></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Quick Replies */}
//               {renderQuickReplies() && (
//                 <div className="p-4 border-t bg-white max-h-48 overflow-y-auto">{renderQuickReplies()}</div>
//               )}

//               {/* Input Area */}
//               <div className="p-4 border-t bg-white">
//                 {isWaitingForInput ? (
//                   <div className="space-y-3">
//                     <Textarea
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       placeholder="Please provide:&#10;• Your name&#10;• Contact (phone/email)&#10;• What you need help with"
//                       rows={3}
//                       className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                       disabled={isProcessing}
//                     />
//                     <Button
//                       onClick={() => handleSendMessage()}
//                       className="w-full bg-blue-600 hover:bg-blue-700"
//                       disabled={!inputMessage.trim() || isProcessing}
//                     >
//                       <Send className="h-4 w-4 mr-2" />
//                       {isProcessing ? "Sending..." : "Send Information"}
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="flex space-x-2">
//                     <Input
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       placeholder="Type your message..."
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                       disabled={isProcessing}
//                     />
//                     <Button
//                       onClick={() => handleSendMessage()}
//                       size="sm"
//                       className="bg-blue-600 hover:bg-blue-700 px-3"
//                       disabled={!inputMessage.trim() || isProcessing}
//                     >
//                       <Send className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   )
// }






"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isQuickReply?: boolean
}

interface UserData {
  name?: string
  contact?: string
  email?: string
  service?: string
  requirement?: string
  selectedDate?: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState("greeting")
  const [userData, setUserData] = useState<UserData>({})
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isWaitingForInput, setIsWaitingForInput] = useState(false)
  const [sessionId] = useState(`chat_${Date.now()}`)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const serviceOptions = [
    { key: "personal-tax", label: "🧾 Personal Tax Services", emoji: "🧾" },
    { key: "business-tax", label: "🏢 Business Tax Services", emoji: "🏢" },
    { key: "immigration-visa", label: "🌎 Immigration & Visa Services", emoji: "🌎" },
    { key: "uscis-forms", label: "📄 USCIS & Immigration Forms", emoji: "📄" },
    { key: "legal-documents", label: "📋 Legal & Documentation Services", emoji: "📋" },
    { key: "business-services", label: "🏗️ Business & Corporate Services", emoji: "🏗️" },
    { key: "trucking-services", label: "🚚 Trucking Compliance & Setup", emoji: "🚚" },
    { key: "other", label: "❓ Something Else / Not Sure", emoji: "❓" },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  const dateOptions = [
    { date: new Date(Date.now() + 86400000), label: "Tomorrow" },
    { date: new Date(Date.now() + 2 * 86400000), label: "Day After Tomorrow" },
    { date: new Date(Date.now() + 3 * 86400000), label: "In 3 Days" },
    { date: new Date(Date.now() + 4 * 86400000), label: "In 4 Days" },
    { date: new Date(Date.now() + 5 * 86400000), label: "In 5 Days" },
  ]

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: "👋 Hi there! Welcome to **Elite Tax Consulting Services**!\n\nI'm here to help you get started. What type of service are you looking for today?",
        sender: "bot",
        timestamp: new Date(),
        isQuickReply: true,
      }
      setMessages([welcomeMessage])
    }
  }

  const addMessage = (text: string, sender: "user" | "bot", isQuickReply = false) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      isQuickReply,
    }
    setMessages((prev) => [...prev, message])
    return message
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text || isProcessing) return

    setIsProcessing(true)
    addMessage(text, "user")
    setInputMessage("")

    // Add typing indicator
    setTimeout(() => {
      handleBotResponse(text)
    }, 1000)
  }

  const handleBotResponse = async (userInput: string) => {
    let botResponse = ""
    let nextStep = currentStep
    let isQuickReply = false

    try {
      switch (currentStep) {
        case "greeting":
          const selectedService = serviceOptions.find(
            (service) =>
              userInput.toLowerCase().includes(service.key) ||
              userInput.toLowerCase().includes(service.label.toLowerCase()) ||
              userInput === service.label,
          )

          if (selectedService) {
            setUserData((prev) => ({ ...prev, service: selectedService.label }))
            botResponse = `Great choice! You've selected **${selectedService.label}** ${selectedService.emoji}\n\nTo help you better, I'll need some quick details:\n\n📝 **Please provide:**\n• Your name\n• Best contact (phone or email)\n• Brief description of what you need\n\n*You can type it all in one message or separate lines*`
            nextStep = "lead-capture"
            setIsWaitingForInput(true)
          } else {
            botResponse =
              "I'd love to help! Please select one of the services from the options above, or tell me what you're looking for. 😊"
            isQuickReply = true
          }
          break

        case "lead-capture":
          // Smart parsing of user input
          const lines = userInput
            .split(/\n|,|\|/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)

          let name = "",
            contact = "",
            requirement = ""

          if (lines.length >= 2) {
            name = lines[0].replace(/^(name:?|i'm|my name is)/i, "").trim()
            contact = lines[1].replace(/^(contact:?|phone:?|email:?)/i, "").trim()
            requirement = lines
              .slice(2)
              .join(" ")
              .replace(/^(need:?|requirement:?|looking for:?)/i, "")
              .trim()
          } else if (lines.length === 1) {
            // Try to extract email or phone from single line
            const emailMatch = userInput.match(/[\w.-]+@[\w.-]+\.\w+/)
            const phoneMatch = userInput.match(/[\d\s\-$$$$]{10,}/)

            if (emailMatch || phoneMatch) {
              contact = emailMatch?.[0] || phoneMatch?.[0] || ""
              name = userInput
                .replace(contact, "")
                .replace(/contact:?|email:?|phone:?/gi, "")
                .trim()
            } else {
              name = userInput
            }
          }

          if (name && (contact || lines.length >= 2)) {
            setUserData((prev) => ({
              ...prev,
              name: name,
              contact: contact,
              requirement: requirement,
              email: contact.includes("@") ? contact : "",
            }))

            botResponse = `Perfect! Thanks **${name}** ✅\n\nI've got your details:\n• **Service:** ${userData.service}\n• **Contact:** ${contact}\n${requirement ? `• **Need:** ${requirement}` : ""}\n\n📅 **Would you like to schedule a FREE consultation call?**\n\nOur tax & business experts can discuss your needs in detail!`
            nextStep = "appointment-choice"
            setIsWaitingForInput(false)
            isQuickReply = true

            // Save lead data immediately
            saveChatData({
              name,
              contact,
              requirement,
              service: userData.service,
              status: "lead_captured",
            })
          } else {
            botResponse = `I need a bit more info to help you! 😊\n\nPlease share:\n• **Your name**\n• **Phone number or email**\n• **What you need help with**\n\n*Example: John Smith, john@email.com, need help with business taxes*`
          }
          break

        case "appointment-choice":
          if (
            userInput.toLowerCase().includes("yes") ||
            userInput.includes("📅 Yes") ||
            userInput.toLowerCase().includes("schedule")
          ) {
            botResponse = "Excellent! 🎉\n\n**Choose your preferred date:**\n\n*Select a date that works best for you*"
            nextStep = "appointment-date"
            isQuickReply = true
          } else if (
            userInput.toLowerCase().includes("no") ||
            userInput.includes("⏳ No") ||
            userInput.toLowerCase().includes("later")
          ) {
            botResponse = `No problem, **${userData.name}**! 👍\n\nOur team will review your request and contact you within **24 hours**.\n\n📧 You'll receive a confirmation email shortly.\n\nThanks for choosing **Elite Tax Consulting**! Have a great day! 😊`
            nextStep = "completed"

            // Save final data
            saveChatData({
              ...userData,
              status: "no_appointment_requested",
            })
          } else {
            botResponse =
              "Would you like to schedule a consultation call? Please choose:\n\n📅 **Yes, let's schedule it!**\n⏳ **No, contact me later**"
            isQuickReply = true
          }
          break

        case "appointment-date":
          const selectedDate = dateOptions.find(
            (dateOption) => userInput.includes(dateOption.label) || userInput.includes(dateOption.date.toDateString()),
          )
          if (selectedDate) {
            setUserData((prev) => ({ ...prev, selectedDate: selectedDate.date }))
            botResponse = `Perfect! You've selected **${selectedDate.date.toDateString()}** 📅\n\n**Now choose your preferred time slot:**\n\n*All times are EST and meetings are 60 minutes*`
            nextStep = "appointment-time"
            isQuickReply = true
          } else {
            botResponse = "Please select one of the available dates above. 📅"
            isQuickReply = true
          }
          break

        case "appointment-time":
          const selectedTime = timeSlots.find((time) => userInput.includes(time))
          if (selectedTime) {
            const appointmentDate = userData.selectedDate || new Date(Date.now() + 86400000)

            botResponse = `🎉 **Consultation Booked Successfully!**\n\n📅 **Date:** ${appointmentDate.toDateString()}\n⏰ **Time:** ${selectedTime} EST\n👤 **With:** Elite Tax Expert\n📞 **Duration:** 60 minutes\n\n✅ **Confirmation email sent!**\n📧 **Google Meet link included**\n\nWe're excited to help you with your ${userData.service?.toLowerCase()}!\n\nSee you soon! 😊`
            nextStep = "completed"

            // Book the appointment
            bookAppointment(appointmentDate.toISOString().split("T")[0], selectedTime)

            // Save final data
            saveChatData({
              ...userData,
              appointmentDate: appointmentDate.toISOString().split("T")[0],
              appointmentTime: selectedTime,
              status: "appointment_booked",
            })
          } else {
            botResponse = "Please select one of the available time slots above. ⏰"
            isQuickReply = true
          }
          break

        default:
          botResponse =
            "Thanks for chatting with us! If you need anything else, feel free to start a new conversation. 😊"
      }

      addMessage(botResponse, "bot", isQuickReply)
      setCurrentStep(nextStep)
    } catch (error) {
      console.error("Chat error:", error)
      addMessage(
        "I apologize, but I'm having a technical issue. Please try again or contact us directly at (555) 123-4567. 😊",
        "bot",
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const saveChatData = async (data: any) => {
    try {
      const chatData = {
        sessionId,
        service: data.service,
        name: data.name,
        contact: data.contact,
        requirement: data.requirement,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: data.status,
        messages: messages,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      })

      if (response.ok) {
        console.log("Chat data saved successfully")
      }
    } catch (error) {
      console.error("Error saving chat data:", error)
    }
  }

  const bookAppointment = async (date: string, time: string) => {
    try {
      const response = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData,
          appointmentDate: date,
          appointmentTime: time,
        }),
      })

      if (response.ok) {
        console.log("Appointment booked successfully")
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
    }
  }

  const handleQuickReply = (option: string) => {
    handleSendMessage(option)
  }

  const renderQuickReplies = () => {
    if (currentStep === "greeting" && messages[messages.length - 1]?.isQuickReply) {
      return (
        <div className="grid grid-cols-1 gap-2 mb-3">
          {serviceOptions.map((service) => (
            <Button
              key={service.key}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(service.label)}
              className="text-xs h-auto py-2 px-3 justify-start text-left hover:bg-blue-50 border-blue-200"
            >
              <span className="mr-2">{service.emoji}</span>
              {service.label.replace(service.emoji, "").trim()}
            </Button>
          ))}
        </div>
      )
    }

    if (currentStep === "appointment-choice" && messages[messages.length - 1]?.isQuickReply) {
      return (
        <div className="flex flex-col gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickReply("📅 Yes, let's schedule it!")}
            className="text-sm h-auto py-3 px-4 bg-green-50 border-green-200 hover:bg-green-100"
          >
            📅 Yes, let's schedule it!
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickReply("⏳ No, contact me later")}
            className="text-sm h-auto py-3 px-4 bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            ⏳ No, contact me later
          </Button>
        </div>
      )
    }

    if (currentStep === "appointment-date" && messages[messages.length - 1]?.isQuickReply) {
      return (
        <div className="flex flex-col gap-2 mb-3">
          {dateOptions.map((dateOption, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(dateOption.label)}
              className="text-sm h-auto py-3 px-4 hover:bg-blue-50 border-blue-200 justify-start"
            >
              📅 {dateOption.label} - {dateOption.date.toLocaleDateString()}
            </Button>
          ))}
        </div>
      )
    }

    if (currentStep === "appointment-time" && messages[messages.length - 1]?.isQuickReply) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(time)}
              className="text-xs h-8 px-2 hover:bg-blue-50 border-blue-200"
            >
              {time}
            </Button>
          ))}
        </div>
      )
    }

    return null
  }

  const formatMessageText = (text: string) => {
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed right-4 bottom-20 z-50">
        <div className="relative">
          <Button
            onClick={() => {
              setIsOpen(!isOpen)
              if (!isOpen) initializeChat()
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse-slow"
            size="lg"
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            <span className="sr-only">Open chat</span>
          </Button>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
              💬
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed right-4 bottom-36 z-50 w-80 md:w-96 max-h-[600px] shadow-2xl">
          <Card className="border-0 bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 rounded-full p-2">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">Elite Tax Assistant</div>
                    <div className="text-xs text-blue-100">Online • Ready to help</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[500px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="h-3 w-3 mr-1 text-blue-600" />
                        ) : (
                          <User className="h-3 w-3 mr-1 text-blue-100" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                      />
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-1">
                        <Bot className="h-3 w-3 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {renderQuickReplies() && (
                <div className="p-4 border-t bg-white max-h-48 overflow-y-auto">{renderQuickReplies()}</div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                {isWaitingForInput ? (
                  <div className="space-y-3">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Please provide:&#10;• Your name&#10;• Contact (phone/email)&#10;• What you need help with"
                      rows={3}
                      className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isProcessing}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!inputMessage.trim() || isProcessing}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isProcessing ? "Sending..." : "Send Information"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isProcessing}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 px-3"
                      disabled={!inputMessage.trim() || isProcessing}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

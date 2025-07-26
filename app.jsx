import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import AddStudentPage from "./AddStudentPage";
import AddTeacherPage from "./AddTeacherPage";

// Mock data for demonstration
const mockData = {
  stats: {
    totalStudents: 1247,
    totalTeachers: 87,
    totalClasses: 32,
    attendance: 94.2,
  },
  recentActivities: [
    {
      id: 1,
      type: "enrollment",
      message: "New student Emma Wilson enrolled in Grade 10",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "assignment",
      message: "Physics Assignment submitted by Grade 11B",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "event",
      message: "Parent-Teacher meeting scheduled for tomorrow",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "grade",
      message: "Chemistry test results published for Grade 9",
      time: "1 day ago",
    },
  ],
  upcomingEvents: [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "2024-02-15",
      time: "9:00 AM",
    },
    { id: 2, title: "Science Fair", date: "2024-02-18", time: "10:00 AM" },
    { id: 3, title: "Sports Day", date: "2024-02-22", time: "8:00 AM" },
  ],
  events: [
    {
      id: 1,
      title: "Annual Science Fair 2024",
      date: "2024-02-18",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description:
        "Students will showcase their innovative science projects and experiments.",
      category: "Academic",
      participants: 156,
      organizer: "Science Department",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      location: "Various Classrooms",
      description:
        "Meet with teachers to discuss student progress and academic goals.",
      category: "Meeting",
      participants: 89,
      organizer: "Administration",
    },
    {
      id: 3,
      title: "Spring Sports Day",
      date: "2024-02-22",
      time: "8:00 AM - 3:00 PM",
      location: "School Playground",
      description:
        "Annual sports competition featuring track and field events, team sports, and fun activities.",
      category: "Sports",
      participants: 234,
      organizer: "Physical Education Department",
    },
    {
      id: 4,
      title: "Drama Club Performance",
      date: "2024-02-25",
      time: "7:00 PM - 9:00 PM",
      location: "School Theater",
      description:
        'Students perform "A Midsummer Night\'s Dream" with costumes and stage effects.',
      category: "Arts",
      participants: 45,
      organizer: "Drama Club",
    },
    {
      id: 5,
      title: "Mathematics Olympiad",
      date: "2024-02-28",
      time: "2:00 PM - 4:00 PM",
      location: "Library Hall",
      description: "Inter-school mathematics competition for grades 9-12.",
      category: "Academic",
      participants: 67,
      organizer: "Mathematics Department",
    },
    {
      id: 6,
      title: "Art Exhibition Opening",
      date: "2024-03-01",
      time: "6:00 PM - 8:00 PM",
      location: "Art Gallery",
      description:
        "Showcase of student artwork including paintings, sculptures, and digital art.",
      category: "Arts",
      participants: 78,
      organizer: "Art Department",
    },
    {
      id: 7,
      title: "Career Guidance Workshop",
      date: "2024-03-05",
      time: "1:00 PM - 3:00 PM",
      location: "Conference Room",
      description:
        "Guest speakers discuss various career paths and college admission processes.",
      category: "Workshop",
      participants: 145,
      organizer: "Guidance Counselor",
    },
    {
      id: 8,
      title: "Green Earth Initiative",
      date: "2024-03-08",
      time: "10:00 AM - 2:00 PM",
      location: "School Garden",
      description:
        "Tree planting ceremony and environmental awareness activities.",
      category: "Community",
      participants: 189,
      organizer: "Environmental Club",
    },
  ],
  teachers: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      classes: ["Grade 10A", "Grade 11B"],
      email: "sarah.johnson@school.edu",
      phone: "(555) 123-4567",
      experience: "12 years",
    },
    {
      id: 2,
      name: "Prof. Michael Smith",
      subject: "English Literature",
      classes: ["Grade 9B", "Grade 12A"],
      email: "michael.smith@school.edu",
      phone: "(555) 234-5678",
      experience: "8 years",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      subject: "Physics",
      classes: ["Grade 11C", "Grade 12B"],
      email: "emily.davis@school.edu",
      phone: "(555) 345-6789",
      experience: "6 years",
    },
    {
      id: 4,
      name: "Mr. Robert Brown",
      subject: "Chemistry",
      classes: ["Grade 9A", "Grade 10C"],
      email: "robert.brown@school.edu",
      phone: "(555) 456-7890",
      experience: "10 years",
    },
    {
      id: 5,
      name: "Mrs. Lisa Anderson",
      subject: "Biology",
      classes: ["Grade 8B", "Grade 9C"],
      email: "lisa.anderson@school.edu",
      phone: "(555) 567-8901",
      experience: "9 years",
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      subject: "Computer Science",
      classes: ["Grade 11A", "Grade 12C"],
      email: "james.wilson@school.edu",
      phone: "(555) 678-9012",
      experience: "7 years",
    },
  ],
  students: [
    {
      id: 1,
      name: "Alex Thompson",
      grade: "Grade 10A",
      age: 16,
      email: "alex.thompson@email.com",
      gpa: 3.8,
    },
    {
      id: 2,
      name: "Emma Johnson",
      grade: "Grade 9B",
      age: 15,
      email: "emma.johnson@email.com",
      gpa: 3.9,
    },
    {
      id: 3,
      name: "Liam Martinez",
      grade: "Grade 11C",
      age: 17,
      email: "liam.martinez@email.com",
      gpa: 3.7,
    },
    {
      id: 4,
      name: "Sophia Lee",
      grade: "Grade 12A",
      age: 18,
      email: "sophia.lee@email.com",
      gpa: 4.0,
    },
    {
      id: 5,
      name: "Noah Williams",
      grade: "Grade 8B",
      age: 14,
      email: "noah.williams@email.com",
      gpa: 3.6,
    },
    {
      id: 6,
      name: "Olivia Brown",
      grade: "Grade 10C",
      age: 16,
      email: "olivia.brown@email.com",
      gpa: 3.8,
    },
    {
      id: 7,
      name: "Ethan Davis",
      grade: "Grade 9A",
      age: 15,
      email: "ethan.davis@email.com",
      gpa: 3.5,
    },
    {
      id: 8,
      name: "Ava Garcia",
      grade: "Grade 11B",
      age: 17,
      email: "ava.garcia@email.com",
      gpa: 3.9,
    },
  ],
  classes: [
    {
      id: 1,
      name: "Grade 10A",
      students: 28,
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      color: "#ff6b6b",
    },
    {
      id: 2,
      name: "Grade 9B",
      students: 25,
      teacher: "Prof. Michael Smith",
      subject: "English Literature",
      color: "#4ecdc4",
    },
    {
      id: 3,
      name: "Grade 11C",
      students: 30,
      teacher: "Ms. Emily Davis",
      subject: "Physics",
      color: "#45b7d1",
    },
    {
      id: 4,
      name: "Grade 12A",
      students: 22,
      teacher: "Prof. Michael Smith",
      subject: "Advanced English",
      color: "#96ceb4",
    },
    {
      id: 5,
      name: "Grade 9A",
      students: 27,
      teacher: "Mr. Robert Brown",
      subject: "Chemistry",
      color: "#feca57",
    },
    {
      id: 6,
      name: "Grade 11B",
      students: 24,
      teacher: "Dr. Sarah Johnson",
      subject: "Advanced Math",
      color: "#ff9ff3",
    },
  ],
  attendance: [
    {
      id: 1,
      studentName: "Alex Thompson",
      grade: "Grade 10A",
      date: "2024-02-14",
      status: "Present",
      subject: "Mathematics",
    },
    {
      id: 2,
      studentName: "Emma Johnson",
      grade: "Grade 9B",
      date: "2024-02-14",
      status: "Present",
      subject: "English Literature",
    },
    {
      id: 3,
      studentName: "Liam Martinez",
      grade: "Grade 11C",
      date: "2024-02-14",
      status: "Absent",
      subject: "Physics",
    },
    {
      id: 4,
      studentName: "Sophia Lee",
      grade: "Grade 12A",
      date: "2024-02-14",
      status: "Present",
      subject: "Advanced English",
    },
    {
      id: 5,
      studentName: "Noah Williams",
      grade: "Grade 8B",
      date: "2024-02-14",
      status: "Late",
      subject: "Biology",
    },
    {
      id: 6,
      studentName: "Olivia Brown",
      grade: "Grade 10C",
      date: "2024-02-14",
      status: "Present",
      subject: "Chemistry",
    },
    {
      id: 7,
      studentName: "Ethan Davis",
      grade: "Grade 9A",
      date: "2024-02-14",
      status: "Present",
      subject: "Chemistry",
    },
    {
      id: 8,
      studentName: "Ava Garcia",
      grade: "Grade 11B",
      date: "2024-02-14",
      status: "Present",
      subject: "Advanced Math",
    },
    {
      id: 9,
      studentName: "Alex Thompson",
      grade: "Grade 10A",
      date: "2024-02-13",
      status: "Present",
      subject: "Mathematics",
    },
    {
      id: 10,
      studentName: "Emma Johnson",
      grade: "Grade 9B",
      date: "2024-02-13",
      status: "Absent",
      subject: "English Literature",
    },
    {
      id: 11,
      studentName: "Liam Martinez",
      grade: "Grade 11C",
      date: "2024-02-13",
      status: "Present",
      subject: "Physics",
    },
    {
      id: 12,
      studentName: "Sophia Lee",
      grade: "Grade 12A",
      date: "2024-02-13",
      status: "Present",
      subject: "Advanced English",
    },
  ],
  grades: [
    {
      id: 1,
      studentName: "Alex Thompson",
      grade: "Grade 10A",
      subject: "Mathematics",
      assignment: "Midterm Exam",
      score: 85,
      maxScore: 100,
      date: "2024-02-10",
    },
    {
      id: 2,
      studentName: "Emma Johnson",
      grade: "Grade 9B",
      subject: "English Literature",
      assignment: "Essay Assignment",
      score: 92,
      maxScore: 100,
      date: "2024-02-08",
    },
    {
      id: 3,
      studentName: "Liam Martinez",
      grade: "Grade 11C",
      subject: "Physics",
      assignment: "Lab Report",
      score: 78,
      maxScore: 100,
      date: "2024-02-12",
    },
    {
      id: 4,
      studentName: "Sophia Lee",
      grade: "Grade 12A",
      subject: "Advanced English",
      assignment: "Research Paper",
      score: 96,
      maxScore: 100,
      date: "2024-02-11",
    },
    {
      id: 5,
      studentName: "Noah Williams",
      grade: "Grade 8B",
      subject: "Biology",
      assignment: "Quiz 3",
      score: 74,
      maxScore: 100,
      date: "2024-02-09",
    },
    {
      id: 6,
      studentName: "Olivia Brown",
      grade: "Grade 10C",
      subject: "Chemistry",
      assignment: "Practical Exam",
      score: 88,
      maxScore: 100,
      date: "2024-02-13",
    },
    {
      id: 7,
      studentName: "Ethan Davis",
      grade: "Grade 9A",
      subject: "Chemistry",
      assignment: "Chemical Equations Test",
      score: 81,
      maxScore: 100,
      date: "2024-02-07",
    },
    {
      id: 8,
      studentName: "Ava Garcia",
      grade: "Grade 11B",
      subject: "Advanced Math",
      assignment: "Calculus Test",
      score: 94,
      maxScore: 100,
      date: "2024-02-14",
    },
    {
      id: 9,
      studentName: "Alex Thompson",
      grade: "Grade 10A",
      subject: "Mathematics",
      assignment: "Homework Set 5",
      score: 90,
      maxScore: 100,
      date: "2024-02-05",
    },
    {
      id: 10,
      studentName: "Emma Johnson",
      grade: "Grade 9B",
      subject: "English Literature",
      assignment: "Poetry Analysis",
      score: 87,
      maxScore: 100,
      date: "2024-02-06",
    },
    {
      id: 11,
      studentName: "Liam Martinez",
      grade: "Grade 11C",
      subject: "Physics",
      assignment: "Problem Set 4",
      score: 82,
      maxScore: 100,
      date: "2024-02-04",
    },
    {
      id: 12,
      studentName: "Sophia Lee",
      grade: "Grade 12A",
      subject: "Advanced English",
      assignment: "Critical Essay",
      score: 98,
      maxScore: 100,
      date: "2024-02-03",
    },
  ],
};

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [managementActiveTab, setManagementActiveTab] = useState("students");
  const [currentPage, setCurrentPage] = useState("dashboard"); // New state for page navigation
  const [selectedItem, setSelectedItem] = useState(null);
  const [modals, setModals] = useState({
    eventRegistration: false,
    gradeEdit: false,
    attendanceHistory: false,
    classDetails: false,
    teacherProfile: false,
    studentProfile: false,
    studentGrades: false,
    editStudentProfile: false,
    addStudent: false,
    contactTeacher: false,
    classManagement: false,
    updateAttendanceStatus: false,
    gradeDetails: false,
    eventDetails: false,
  });
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Initialize PWA notifications
    initializePWANotifications();
  }, []);

  // Navigation functions
  const navigateToPage = (page, item = null) => {
    setCurrentPage(page);
    setSelectedItem(item);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const navigateBack = () => {
    setCurrentPage("dashboard");
    setSelectedItem(null);
  };

  // Handler for saving new student
  const handleSaveStudent = (studentData) => {
    // In a real app, this would save to backend
    console.log("Saving student:", studentData);
    // Add to mock data (in a real app, this would trigger a refresh from API)
    mockData.students.push(studentData);
    navigateBack();
    // Show success message
    alert("Student added successfully!");
  };

  // Handler for saving new teacher
  const handleSaveTeacher = (teacherData) => {
    // In a real app, this would save to backend
    console.log("Saving teacher:", teacherData);
    // Add to mock data (in a real app, this would trigger a refresh from API)
    mockData.teachers.push(teacherData);
    navigateBack();
    // Show success message
    alert("Teacher added successfully!");
  };

  // Modal management functions
  const openModal = (modalType, item = null) => {
    setSelectedItem(item);
    setModals((prev) => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType) => {
    setModals((prev) => ({ ...prev, [modalType]: false }));
    setSelectedItem(null);
  };

  const closeAllModals = () => {
    setModals({
      eventRegistration: false,
      gradeEdit: false,
      attendanceHistory: false,
      classDetails: false,
      teacherProfile: false,
      studentProfile: false,
      studentGrades: false,
      editStudentProfile: false,
      addStudent: false,
      contactTeacher: false,
      classManagement: false,
      updateAttendanceStatus: false,
      gradeDetails: false,
      eventDetails: false,
    });
    setSelectedItem(null);
  };

  // Initialize PWA notification system
  const initializePWANotifications = async () => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    // Register for push notifications if service worker is available
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker is ready for push notifications");

        // Check if push messaging is supported
        if (registration.pushManager) {
          console.log("Push messaging is supported");
        }
      } catch (error) {
        console.error("Error setting up push notifications:", error);
      }
    }
  };

  // Universal PWA notification system for all devices and browsers
  const sendNotification = async () => {
    if (!("Notification" in window)) {
      alert(
        "❌ This browser does not support notifications. Please use Chrome, Edge, Safari, or Firefox.",
      );
      return;
    }

    // Enhanced permission handling for mobile and desktop
    let permission = Notification.permission;
    if (permission !== "granted") {
      // Show instructions before requesting permission
      if (permission === "default") {
        alert(
          "📱 We will now request notification permission. Please allow notifications to receive updates from SchoolHub!",
        );
      }
      permission = await Notification.requestPermission();
    }

    if (permission === "granted") {
      const timestamp = Date.now();
      const uniqueId = Math.random().toString(36).substr(2, 9);
      const timeString = new Date(timestamp).toLocaleTimeString();
      const deviceInfo = navigator.userAgent.includes("Mobile")
        ? "📱 Mobile"
        : navigator.userAgent.includes("Edge")
          ? "🌐 Edge"
          : "💻 Desktop";

      console.log(`🚀 Sending notifications on ${deviceInfo} device`);

      // Strategy 1: Service Worker Push Notification (PWA Standard)
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;

          if (registration.active) {
            registration.active.postMessage({
              type: "SHOW_NOTIFICATION",
              payload: {
                title: `📚 SchoolHub PWA (${deviceInfo})`,
                body: `PWA notification sent at ${timeString}. This works across all devices! (ID: ${uniqueId})`,
                icon: "/favicon.svg",
                badge: "/favicon.svg",
                tag: `pwa-${uniqueId}-${timestamp}`,
                data: {
                  url: window.location.origin,
                  timestamp: timestamp,
                  id: uniqueId,
                  type: "pwa",
                  device: deviceInfo,
                },
              },
            });
            console.log(`✅ PWA Notification sent: pwa-${uniqueId}`);
          }
        } catch (error) {
          console.error("❌ Service worker notification failed:", error);
        }
      }

      // Strategy 2: Direct Notification API (Cross-browser compatibility)
      const showDirectNotification = (delay, title, body, tag) => {
        setTimeout(() => {
          try {
            const notification = new Notification(title, {
              body: body,
              icon: "/favicon.svg",
              badge: "/favicon.svg",
              tag: tag,
              vibrate: [200, 100, 200], // Enhanced vibration for mobile
              silent: false,
              requireInteraction: false,
              data: {
                timestamp: timestamp,
                id: uniqueId,
                type: "direct",
                device: deviceInfo,
              },
            });

            // Handle notification click
            notification.onclick = function () {
              window.focus();
              this.close();
            };

            console.log(`✅ Direct notification sent: ${tag}`);
          } catch (error) {
            console.error(`❌ Failed to send ${tag}:`, error);
          }
        }, delay);
      };

      // Send multiple notifications with different delays for reliability
      showDirectNotification(
        100,
        `📱 SchoolHub Mobile Alert`,
        `Mobile-optimized notification at ${timeString} (${deviceInfo})`,
        `mobile-${uniqueId}-${timestamp}`,
      );

      showDirectNotification(
        600,
        `🌐 SchoolHub Cross-Platform`,
        `Universal notification working on ${deviceInfo} at ${timeString}`,
        `universal-${uniqueId}-${timestamp}`,
      );

      showDirectNotification(
        1100,
        `🔔 SchoolHub PWA Demo`,
        `Progressive Web App notification demo complete! Time: ${timeString}`,
        `demo-${uniqueId}-${timestamp}`,
      );

      // Enhanced UI Feedback
      const button = document.querySelector(".btn-primary");
      if (button) {
        const originalText = button.textContent;
        const originalStyle = button.style.background;

        // Success animation
        button.textContent = `✅ Sent on ${deviceInfo}!`;
        button.style.background = "linear-gradient(45deg, #10b981, #059669)";
        button.style.transform = "scale(1.05)";

        setTimeout(() => {
          button.textContent = "🔄 Sending More...";
          button.style.background = "linear-gradient(45deg, #3b82f6, #1d4ed8)";
        }, 1000);

        setTimeout(() => {
          button.textContent = "🎉 All Notifications Sent!";
          button.style.background = "linear-gradient(45deg, #8b5cf6, #7c3aed)";
        }, 2000);

        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = originalStyle;
          button.style.transform = "";
        }, 4000);
      }

      // Console success message
      console.log(`🎉 Universal PWA notifications sent successfully!`);
      console.log(`📊 Device: ${deviceInfo}`);
      console.log(`⏰ Time: ${timeString}`);
      console.log(`🆔 Session ID: ${uniqueId}`);
    } else if (permission === "denied") {
      // Enhanced error handling with device-specific instructions
      const instructions = navigator.userAgent.includes("Mobile")
        ? '📱 Mobile Instructions:\n1. Go to your browser settings\n2. Find "Site Settings" or "Permissions"\n3. Enable notifications for this site\n4. Refresh and try again'
        : navigator.userAgent.includes("Edge")
          ? '🌐 Microsoft Edge Instructions:\n1. Click the lock/shield icon in address bar\n2. Set notifications to "Allow"\n3. Refresh and try again'
          : "💻 Desktop Instructions:\n1. Click the lock icon in address bar\n2. Enable notifications\n3. Refresh and try again";

      alert(`❌ Notifications are blocked!\n\n${instructions}`);
    } else {
      alert(
        "⚠️ Unable to get notification permission. Please try again or check your browser settings.",
      );
    }
  };

  const StatCard = ({ title, value, icon, trend }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <span className={`trend ${trend > 0 ? "positive" : "negative"}`}>
            {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="activity-item">
      <div className={`activity-icon ${activity.type}`}>
        {activity.type === "enrollment" && "👤"}
        {activity.type === "assignment" && "📝"}
        {activity.type === "event" && "📅"}
        {activity.type === "grade" && "📊"}
      </div>
      <div className="activity-content">
        <p>{activity.message}</p>
        <span className="activity-time">{activity.time}</span>
      </div>
    </div>
  );

  const ClassCard = ({ classItem }) => (
    <div className="class-card" style={{ backgroundColor: classItem.color }}>
      <div className="class-header">
        <h4>{classItem.name}</h4>
        <span className="student-count">{classItem.students} students</span>
      </div>
      <div className="class-details">
        <p>
          <strong>Teacher:</strong> {classItem.teacher}
        </p>
        <p>
          <strong>Subject:</strong> {classItem.subject}
        </p>
      </div>
      <div className="class-actions">
        <button
          className="btn-secondary"
          onClick={() => navigateToPage("classDetails", classItem)}
        >
          View Details
        </button>
        <button
          className="btn-primary"
          onClick={() => openModal("classManagement", classItem)}
        >
          Manage
        </button>
      </div>
    </div>
  );

  const TeacherCard = ({ teacher }) => (
    <div className="teacher-card">
      <div className="teacher-header">
        <div className="teacher-avatar">
          {teacher.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="teacher-info">
          <h4>{teacher.name}</h4>
          <p className="teacher-subject">{teacher.subject}</p>
        </div>
      </div>
      <div className="teacher-details">
        <p>
          <strong>Email:</strong> {teacher.email}
        </p>
        <p>
          <strong>Phone:</strong> {teacher.phone}
        </p>
        <p>
          <strong>Experience:</strong> {teacher.experience}
        </p>
      </div>
      <div className="teacher-actions">
        <button
          className="btn-secondary"
          onClick={() => openModal("contactTeacher", teacher)}
        >
          Contact
        </button>
        <button
          className="btn-primary"
          onClick={() => openModal("teacherProfile", teacher)}
        >
          View Profile
        </button>
      </div>
    </div>
  );

  const StudentCard = ({ student }) => (
    <div className="student-card">
      <div className="student-header">
        <div className="student-avatar">
          {student.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="student-info">
          <h4>{student.name}</h4>
          <p className="student-grade">{student.grade}</p>
        </div>
      </div>
      <div className="student-details">
        <p>
          <strong>Age:</strong> {student.age} years
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>GPA:</strong>{" "}
          <span
            className={`gpa ${student.gpa >= 3.5 ? "high" : student.gpa >= 3.0 ? "medium" : "low"}`}
          >
            {student.gpa}
          </span>
        </p>
      </div>
      <div className="student-actions">
        <button
          className="btn-secondary"
          onClick={() => navigateToPage("studentDetails", student)}
        >
          View Details
        </button>
        <button
          className="btn-primary"
          onClick={() => openModal("editStudentProfile", student)}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );

  const EventCard = ({ event }) => {
    const getCategoryIcon = (category) => {
      switch (category) {
        case "Academic":
          return "📚";
        case "Sports":
          return "⚽";
        case "Arts":
          return "🎨";
        case "Meeting":
          return "👥";
        case "Workshop":
          return "🛠️";
        case "Community":
          return "🌱";
        default:
          return "📅";
      }
    };

    const getCategoryColor = (category) => {
      switch (category) {
        case "Academic":
          return "#3b82f6";
        case "Sports":
          return "#ef4444";
        case "Arts":
          return "#8b5cf6";
        case "Meeting":
          return "#06b6d4";
        case "Workshop":
          return "#f59e0b";
        case "Community":
          return "#10b981";
        default:
          return "#6b7280";
      }
    };

    const handleViewDetails = () => {
      console.log("Opening event details for:", event.title);
      openModal("eventDetails", event);
    };

    return (
      <div className="event-card">
        <div className="event-header">
          <div className="event-date-badge">
            <span className="event-day">{new Date(event.date).getDate()}</span>
            <span className="event-month">
              {new Date(event.date).toLocaleDateString("en", {
                month: "short",
              })}
            </span>
          </div>
          <div
            className="event-category"
            style={{ backgroundColor: getCategoryColor(event.category) }}
          >
            {getCategoryIcon(event.category)} {event.category}
          </div>
        </div>
        <div className="event-content">
          <h4>{event.title}</h4>
          <div className="event-details">
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
            <p>
              <strong>🕒 Time:</strong> {event.time}
            </p>
            <p>
              <strong>👤 Participants:</strong> {event.participants} registered
            </p>
            <p>
              <strong>🎯 Organizer:</strong> {event.organizer}
            </p>
          </div>
          <p className="event-description">{event.description}</p>
        </div>
        <div className="event-actions">
          <button
            className="btn-secondary"
            onClick={() => navigateToPage("eventDetails", event)}
          >
            📋 View Details
          </button>
          <button
            className="btn-primary"
            onClick={() => openModal("eventRegistration", event)}
          >
            🎫 Register
          </button>
        </div>
      </div>
    );
  };

  const AttendanceCard = ({ attendance }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case "Present":
          return "✅";
        case "Absent":
          return "❌";
        case "Late":
          return "⏰";
        default:
          return "❓";
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "Present":
          return "#10b981";
        case "Absent":
          return "#ef4444";
        case "Late":
          return "#f59e0b";
        default:
          return "#6b7280";
      }
    };

    return (
      <div className="attendance-card">
        <div className="attendance-header">
          <div className="student-avatar">
            {attendance.studentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="attendance-info">
            <h4>{attendance.studentName}</h4>
            <p className="attendance-grade">{attendance.grade}</p>
          </div>
          <div
            className="attendance-status"
            style={{ backgroundColor: getStatusColor(attendance.status) }}
          >
            {getStatusIcon(attendance.status)} {attendance.status}
          </div>
        </div>
        <div className="attendance-details">
          <p>
            <strong>📅 Date:</strong>{" "}
            {new Date(attendance.date).toLocaleDateString()}
          </p>
          <p>
            <strong>📚 Subject:</strong> {attendance.subject}
          </p>
        </div>
        <div className="attendance-actions">
          <button
            className="btn-secondary"
            onClick={() => navigateToPage("attendanceDetails", attendance)}
          >
            View Details
          </button>
          <button
            className="btn-primary"
            onClick={() => openModal("updateAttendanceStatus", attendance)}
          >
            Update Status
          </button>
        </div>
      </div>
    );
  };

  const GradeCard = ({ gradeEntry }) => {
    const getGradeColor = (score, maxScore) => {
      const percentage = (score / maxScore) * 100;
      if (percentage >= 90) return "#10b981";
      if (percentage >= 80) return "#3b82f6";
      if (percentage >= 70) return "#f59e0b";
      return "#ef4444";
    };

    const getGradeLetter = (score, maxScore) => {
      const percentage = (score / maxScore) * 100;
      if (percentage >= 97) return "A+";
      if (percentage >= 93) return "A";
      if (percentage >= 90) return "A-";
      if (percentage >= 87) return "B+";
      if (percentage >= 83) return "B";
      if (percentage >= 80) return "B-";
      if (percentage >= 77) return "C+";
      if (percentage >= 73) return "C";
      if (percentage >= 70) return "C-";
      if (percentage >= 67) return "D+";
      if (percentage >= 65) return "D";
      return "F";
    };

    const percentage = Math.round(
      (gradeEntry.score / gradeEntry.maxScore) * 100,
    );

    const handleViewDetails = () => {
      console.log(
        "Opening grade details for:",
        gradeEntry.studentName,
        gradeEntry.assignment,
      );
      openModal("gradeDetails", gradeEntry);
    };

    return (
      <div className="grade-card">
        <div className="grade-header">
          <div className="student-avatar">
            {gradeEntry.studentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="grade-info">
            <h4>{gradeEntry.studentName}</h4>
            <p className="grade-class">{gradeEntry.grade}</p>
          </div>
          <div
            className="grade-score"
            style={{
              backgroundColor: getGradeColor(
                gradeEntry.score,
                gradeEntry.maxScore,
              ),
            }}
          >
            {getGradeLetter(gradeEntry.score, gradeEntry.maxScore)}
          </div>
        </div>
        <div className="grade-details">
          <div className="assignment-info">
            <h5>{gradeEntry.assignment}</h5>
            <p>
              <strong>📚 Subject:</strong> {gradeEntry.subject}
            </p>
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(gradeEntry.date).toLocaleDateString()}
            </p>
          </div>
          <div className="score-breakdown">
            <div className="score-display">
              <span className="score">{gradeEntry.score}</span>
              <span className="max-score">/{gradeEntry.maxScore}</span>
              <span className="percentage">({percentage}%)</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getGradeColor(
                    gradeEntry.score,
                    gradeEntry.maxScore,
                  ),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="grade-actions">
          <button
            className="btn-secondary"
            onClick={() => navigateToPage("gradeDetails", gradeEntry)}
          >
            📊 View Details
          </button>
          <button
            className="btn-primary"
            onClick={() => openModal("gradeEdit", gradeEntry)}
          >
            ✏️ Edit Grade
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>📚 SchoolHub</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="nav-icon">🏠</span>
            Overview
          </button>
          <button
            className={`nav-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <span className="nav-icon">👥</span>
            Students
          </button>
          <button
            className={`nav-item ${activeTab === "teachers" ? "active" : ""}`}
            onClick={() => setActiveTab("teachers")}
          >
            <span className="nav-icon">👨‍🏫</span>
            Teachers
          </button>
          <button
            className={`nav-item ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            <span className="nav-icon">📚</span>
            Classes
          </button>
          <button
            className={`nav-item ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <span className="nav-icon">📊</span>
            Attendance
          </button>
          <button
            className={`nav-item ${activeTab === "grades" ? "active" : ""}`}
            onClick={() => setActiveTab("grades")}
          >
            <span className="nav-icon">🎯</span>
            Grades
          </button>
          <button
            className={`nav-item ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            <span className="nav-icon">📅</span>
            Events
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>School Management Dashboard</h1>
          <div className="header-actions">
            <button className="btn-primary" onClick={sendNotification}>
              🔔 Send Notification
            </button>
            <div
              className="user-profile"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={() => setShowUserMenu(false)}>
                    👤 Profile
                  </button>
                  <button onClick={() => setShowUserMenu(false)}>
                    ⚙️ Settings
                  </button>
                  <button onClick={onLogout} className="logout-btn">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {/* Render dedicated pages when navigated to */}
          {currentPage === "addStudent" && (
            <AddStudentPage onBack={navigateBack} onSave={handleSaveStudent} />
          )}

          {currentPage === "addTeacher" && (
            <AddTeacherPage onBack={navigateBack} onSave={handleSaveTeacher} />
          )}

          {currentPage === "studentDetails" && selectedItem && (
            <div className="page-content">
              <div className="page-header">
                <button className="btn-secondary" onClick={navigateBack}>
                  ← Back to Dashboard
                </button>
                <h1>Student Details - {selectedItem.name}</h1>
                <button
                  className="btn-primary"
                  onClick={() => openModal("editStudentProfile", selectedItem)}
                >
                  Edit Profile
                </button>
              </div>

              <div className="student-details-content">
                <div className="details-grid">
                  <div className="main-details">
                    <div className="detail-card">
                      <h3>📋 Personal Information</h3>
                      <div className="student-profile-header">
                        <div className="student-avatar-large">
                          {selectedItem.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="profile-info">
                          <h2>{selectedItem.name}</h2>
                          <p className="student-grade">{selectedItem.grade}</p>
                          <p className="student-age">
                            Age: {selectedItem.age} years
                          </p>
                        </div>
                      </div>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Email:</label>
                          <span>{selectedItem.email}</span>
                        </div>
                        <div className="info-item">
                          <label>Current GPA:</label>
                          <span
                            className={`gpa ${selectedItem.gpa >= 3.5 ? "high" : selectedItem.gpa >= 3.0 ? "medium" : "low"}`}
                          >
                            {selectedItem.gpa}
                          </span>
                        </div>
                        <div className="info-item">
                          <label>Student ID:</label>
                          <span>
                            STU{selectedItem.id.toString().padStart(4, "0")}
                          </span>
                        </div>
                        <div className="info-item">
                          <label>Enrollment Date:</label>
                          <span>September 1, 2023</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📊 Academic Performance</h3>
                      <div className="grades-summary">
                        <div className="performance-stats">
                          <div className="stat-card">
                            <h4>Overall GPA</h4>
                            <span className="stat-value">
                              {selectedItem.gpa}
                            </span>
                          </div>
                          <div className="stat-card">
                            <h4>Class Rank</h4>
                            <span className="stat-value">3rd</span>
                          </div>
                          <div className="stat-card">
                            <h4>Attendance</h4>
                            <span className="stat-value">94.2%</span>
                          </div>
                        </div>
                        <div className="recent-grades">
                          <h4>Recent Grades</h4>
                          <div className="grades-list">
                            {mockData.grades
                              .filter(
                                (g) => g.studentName === selectedItem.name,
                              )
                              .slice(0, 5)
                              .map((grade) => (
                                <div key={grade.id} className="grade-item">
                                  <span className="subject">
                                    {grade.subject}
                                  </span>
                                  <span className="assignment">
                                    {grade.assignment}
                                  </span>
                                  <span className="score">
                                    {grade.score}/{grade.maxScore}
                                  </span>
                                  <span className="date">
                                    {new Date(grade.date).toLocaleDateString()}
                                  </span>
                                </div>
                              ))}
                          </div>
                          <button
                            className="btn-secondary"
                            onClick={() =>
                              openModal("studentGrades", selectedItem)
                            }
                          >
                            View All Grades
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📅 Attendance Record</h3>
                      <div className="attendance-summary">
                        <div className="attendance-stats">
                          <div className="stat-item">
                            <label>This Month:</label>
                            <span>18/20 days (90%)</span>
                          </div>
                          <div className="stat-item">
                            <label>This Semester:</label>
                            <span>85/90 days (94.4%)</span>
                          </div>
                          <div className="stat-item">
                            <label>Total Absences:</label>
                            <span>5 days</span>
                          </div>
                        </div>
                        <button
                          className="btn-secondary"
                          onClick={() =>
                            openModal("attendanceHistory", selectedItem)
                          }
                        >
                          View Attendance History
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-details">
                    <div className="detail-card">
                      <h3>👨‍👩‍👧‍👦 Guardian Information</h3>
                      <div className="guardian-info">
                        <div className="guardian-item">
                          <h4>Primary Guardian</h4>
                          <p>
                            <strong>Name:</strong> John Thompson
                          </p>
                          <p>
                            <strong>Relation:</strong> Father
                          </p>
                          <p>
                            <strong>Phone:</strong> (555) 123-4567
                          </p>
                          <p>
                            <strong>Email:</strong> john.thompson@email.com
                          </p>
                        </div>
                        <div className="guardian-item">
                          <h4>Emergency Contact</h4>
                          <p>
                            <strong>Name:</strong> Sarah Thompson
                          </p>
                          <p>
                            <strong>Relation:</strong> Mother
                          </p>
                          <p>
                            <strong>Phone:</strong> (555) 234-5678
                          </p>
                          <p>
                            <strong>Email:</strong> sarah.thompson@email.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>🏥 Medical Information</h3>
                      <div className="medical-info">
                        <div className="info-item">
                          <label>Blood Type:</label>
                          <span>O+</span>
                        </div>
                        <div className="info-item">
                          <label>Allergies:</label>
                          <span>None reported</span>
                        </div>
                        <div className="info-item">
                          <label>Medical Conditions:</label>
                          <span>None</span>
                        </div>
                        <div className="info-item">
                          <label>Emergency Medical Contact:</label>
                          <span>Dr. Smith - (555) 987-6543</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>🎯 Extracurricular Activities</h3>
                      <div className="activities-list">
                        <div className="activity-item">
                          <span className="activity-name">
                            🏀 Basketball Team
                          </span>
                          <span className="activity-role">Player</span>
                        </div>
                        <div className="activity-item">
                          <span className="activity-name">🎭 Drama Club</span>
                          <span className="activity-role">Member</span>
                        </div>
                        <div className="activity-item">
                          <span className="activity-name">
                            🔬 Science Olympiad
                          </span>
                          <span className="activity-role">Team Captain</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "classDetails" && selectedItem && (
            <div className="page-content">
              <div className="page-header">
                <button className="btn-secondary" onClick={navigateBack}>
                  ← Back to Dashboard
                </button>
                <h1>Class Details - {selectedItem.name}</h1>
                <button
                  className="btn-primary"
                  onClick={() => openModal("classManagement", selectedItem)}
                >
                  Manage Class
                </button>
              </div>

              <div className="class-details-content">
                <div className="details-grid">
                  <div className="main-details">
                    <div className="detail-card">
                      <h3>📚 Class Overview</h3>
                      <div
                        className="class-info-header"
                        style={{ backgroundColor: selectedItem.color }}
                      >
                        <div className="class-title">
                          <h2>{selectedItem.name}</h2>
                          <p>{selectedItem.subject}</p>
                        </div>
                        <div className="class-stats">
                          <div className="stat-item">
                            <span className="stat-number">
                              {selectedItem.students}
                            </span>
                            <span className="stat-label">Students</span>
                          </div>
                        </div>
                      </div>
                      <div className="class-info-details">
                        <div className="info-item">
                          <label>Teacher:</label>
                          <span>{selectedItem.teacher}</span>
                        </div>
                        <div className="info-item">
                          <label>Subject:</label>
                          <span>{selectedItem.subject}</span>
                        </div>
                        <div className="info-item">
                          <label>Room:</label>
                          <span>Room 201</span>
                        </div>
                        <div className="info-item">
                          <label>Schedule:</label>
                          <span>Mon, Wed, Fri - 10:00 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>👥 Students Enrolled</h3>
                      <div className="students-list">
                        {mockData.students
                          .filter((s) => s.grade === selectedItem.name)
                          .map((student) => (
                            <div key={student.id} className="student-row">
                              <div className="student-avatar-small">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="student-info-row">
                                <span className="student-name">
                                  {student.name}
                                </span>
                                <span className="student-gpa">
                                  GPA: {student.gpa}
                                </span>
                              </div>
                              <button
                                className="btn-small"
                                onClick={() =>
                                  navigateToPage("studentDetails", student)
                                }
                              >
                                View Details
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📊 Class Performance</h3>
                      <div className="performance-overview">
                        <div className="performance-stats">
                          <div className="stat-card">
                            <h4>Average Grade</h4>
                            <span className="stat-value">B+</span>
                          </div>
                          <div className="stat-card">
                            <h4>Attendance Rate</h4>
                            <span className="stat-value">92.5%</span>
                          </div>
                          <div className="stat-card">
                            <h4>Assignments Completed</h4>
                            <span className="stat-value">89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-details">
                    <div className="detail-card">
                      <h3>📅 Class Schedule</h3>
                      <div className="schedule-info">
                        <div className="schedule-item">
                          <span className="day">Monday</span>
                          <span className="time">10:00 - 11:30 AM</span>
                          <span className="room">Room 201</span>
                        </div>
                        <div className="schedule-item">
                          <span className="day">Wednesday</span>
                          <span className="time">10:00 - 11:30 AM</span>
                          <span className="room">Room 201</span>
                        </div>
                        <div className="schedule-item">
                          <span className="day">Friday</span>
                          <span className="time">10:00 - 11:30 AM</span>
                          <span className="room">Room 201</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📝 Recent Assignments</h3>
                      <div className="assignments-list">
                        <div className="assignment-item">
                          <span className="assignment-name">Midterm Exam</span>
                          <span className="due-date">Due: Mar 15</span>
                          <span className="status completed">Completed</span>
                        </div>
                        <div className="assignment-item">
                          <span className="assignment-name">
                            Chapter 5 Quiz
                          </span>
                          <span className="due-date">Due: Mar 10</span>
                          <span className="status completed">Completed</span>
                        </div>
                        <div className="assignment-item">
                          <span className="assignment-name">
                            Research Project
                          </span>
                          <span className="due-date">Due: Mar 25</span>
                          <span className="status active">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📚 Course Materials</h3>
                      <div className="materials-list">
                        <div className="material-item">
                          <span className="material-icon">📄</span>
                          <span className="material-name">Syllabus.pdf</span>
                        </div>
                        <div className="material-item">
                          <span className="material-icon">📖</span>
                          <span className="material-name">
                            Textbook Ch. 1-10
                          </span>
                        </div>
                        <div className="material-item">
                          <span className="material-icon">🎥</span>
                          <span className="material-name">Lecture Videos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "eventDetails" && selectedItem && (
            <div className="page-content">
              <div className="page-header">
                <button className="btn-secondary" onClick={navigateBack}>
                  ← Back to Dashboard
                </button>
                <h1>Event Details - {selectedItem.title}</h1>
                <button
                  className="btn-primary"
                  onClick={() => openModal("eventRegistration", selectedItem)}
                >
                  Register for Event
                </button>
              </div>

              <div className="event-details-content">
                <div className="details-grid">
                  <div className="main-details">
                    <div
                      className="event-banner"
                      style={{
                        backgroundColor: (() => {
                          switch (selectedItem.category) {
                            case "Academic":
                              return "#3b82f6";
                            case "Sports":
                              return "#ef4444";
                            case "Arts":
                              return "#8b5cf6";
                            case "Meeting":
                              return "#06b6d4";
                            case "Workshop":
                              return "#f59e0b";
                            case "Community":
                              return "#10b981";
                            default:
                              return "#6b7280";
                          }
                        })(),
                      }}
                    >
                      <div className="event-banner-content">
                        <div className="event-category-large">
                          {(() => {
                            switch (selectedItem.category) {
                              case "Academic":
                                return "📚";
                              case "Sports":
                                return "⚽";
                              case "Arts":
                                return "🎨";
                              case "Meeting":
                                return "👥";
                              case "Workshop":
                                return "🛠️";
                              case "Community":
                                return "🌱";
                              default:
                                return "📅";
                            }
                          })()}{" "}
                          {selectedItem.category}
                        </div>
                        <h2>{selectedItem.title}</h2>
                        <div className="event-meta">
                          <span>
                            📅{" "}
                            {new Date(selectedItem.date).toLocaleDateString(
                              "en",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span>🕒 {selectedItem.time}</span>
                          <span>📍 {selectedItem.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📋 Event Description</h3>
                      <p className="event-description">
                        {selectedItem.description}
                      </p>

                      <div className="event-highlights">
                        <h4>Event Highlights</h4>
                        <ul>
                          <li>Interactive activities and demonstrations</li>
                          <li>Expert speakers and presentations</li>
                          <li>Networking opportunities</li>
                          <li>Refreshments and materials provided</li>
                          <li>Certificate of participation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>👥 Registration Information</h3>
                      <div className="registration-details">
                        <div className="reg-stats">
                          <div className="stat-item">
                            <label>Current Registrations:</label>
                            <span>
                              {selectedItem.participants} participants
                            </span>
                          </div>
                          <div className="stat-item">
                            <label>Maximum Capacity:</label>
                            <span>
                              {Math.floor(selectedItem.participants * 1.2)}{" "}
                              participants
                            </span>
                          </div>
                          <div className="stat-item">
                            <label>Registration Fee:</label>
                            <span className="fee free">Free</span>
                          </div>
                          <div className="stat-item">
                            <label>Registration Status:</label>
                            <span className="status open">Open</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-details">
                    <div className="detail-card">
                      <h3>🏢 Organizer</h3>
                      <div className="organizer-info">
                        <h4>{selectedItem.organizer}</h4>
                        <p>
                          📧{" "}
                          {selectedItem.organizer
                            .toLowerCase()
                            .replace(/\s+/g, ".")}
                          @school.edu
                        </p>
                        <p>📞 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📍 Venue Details</h3>
                      <div className="venue-info">
                        <h4>{selectedItem.location}</h4>
                        <p>🏫 Main Campus Building</p>
                        <p>🚗 Parking available</p>
                        <p>♿ Wheelchair accessible</p>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📋 Event Schedule</h3>
                      <div className="schedule-timeline">
                        <div className="timeline-item">
                          <span className="time">9:00 AM</span>
                          <span className="activity">Registration</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">9:30 AM</span>
                          <span className="activity">Welcome</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">10:00 AM</span>
                          <span className="activity">Main Activities</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">12:00 PM</span>
                          <span className="activity">Lunch Break</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">3:30 PM</span>
                          <span className="activity">Closing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "gradeDetails" && selectedItem && (
            <div className="page-content">
              <div className="page-header">
                <button className="btn-secondary" onClick={navigateBack}>
                  ← Back to Dashboard
                </button>
                <h1>Grade Details - {selectedItem.assignment}</h1>
                <button
                  className="btn-primary"
                  onClick={() => openModal("gradeEdit", selectedItem)}
                >
                  Edit Grade
                </button>
              </div>

              <div className="grade-details-page">
                {/* Copy the detailed grade content from the modal */}
                <div className="grade-details-overview">
                  <div className="student-grade-header">
                    <div className="student-avatar">
                      {selectedItem.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="student-grade-info">
                      <h4>{selectedItem.studentName}</h4>
                      <p>
                        {selectedItem.grade} - {selectedItem.subject}
                      </p>
                    </div>
                    <div
                      className="grade-score-large"
                      style={{
                        backgroundColor: (() => {
                          const percentage =
                            (selectedItem.score / selectedItem.maxScore) * 100;
                          if (percentage >= 90) return "#10b981";
                          if (percentage >= 80) return "#3b82f6";
                          if (percentage >= 70) return "#f59e0b";
                          return "#ef4444";
                        })(),
                      }}
                    >
                      {(() => {
                        const percentage =
                          (selectedItem.score / selectedItem.maxScore) * 100;
                        if (percentage >= 97) return "A+";
                        if (percentage >= 93) return "A";
                        if (percentage >= 90) return "A-";
                        if (percentage >= 87) return "B+";
                        if (percentage >= 83) return "B";
                        if (percentage >= 80) return "B-";
                        if (percentage >= 77) return "C+";
                        if (percentage >= 73) return "C";
                        if (percentage >= 70) return "C-";
                        if (percentage >= 67) return "D+";
                        if (percentage >= 65) return "D";
                        return "F";
                      })()}
                    </div>
                  </div>

                  <div className="grade-metrics">
                    <div className="metric-card">
                      <h5>📊 Score Breakdown</h5>
                      <div className="score-details">
                        <div className="score-item">
                          <span>Raw Score:</span>
                          <span className="score-value">
                            {selectedItem.score}/{selectedItem.maxScore}
                          </span>
                        </div>
                        <div className="score-item">
                          <span>Percentage:</span>
                          <span className="score-value">
                            {Math.round(
                              (selectedItem.score / selectedItem.maxScore) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="score-item">
                          <span>Class Average:</span>
                          <span>78.5%</span>
                        </div>
                        <div className="score-item">
                          <span>Class Rank:</span>
                          <span className="score-value">3rd out of 28</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "attendanceDetails" && selectedItem && (
            <div className="page-content">
              <div className="page-header">
                <button className="btn-secondary" onClick={navigateBack}>
                  ← Back to Dashboard
                </button>
                <h1>Attendance Details - {selectedItem.studentName}</h1>
                <button
                  className="btn-primary"
                  onClick={() =>
                    openModal("updateAttendanceStatus", selectedItem)
                  }
                >
                  Update Status
                </button>
              </div>

              <div className="attendance-details-page">
                <div className="details-grid">
                  <div className="main-details">
                    <div className="detail-card">
                      <h3>📊 Attendance Overview</h3>
                      <div className="attendance-summary-stats">
                        <div className="summary-card">
                          <h4>Present Days</h4>
                          <span className="stat-number present">18</span>
                        </div>
                        <div className="summary-card">
                          <h4>Absent Days</h4>
                          <span className="stat-number absent">2</span>
                        </div>
                        <div className="summary-card">
                          <h4>Late Days</h4>
                          <span className="stat-number late">1</span>
                        </div>
                        <div className="summary-card">
                          <h4>Attendance Rate</h4>
                          <span className="stat-number rate">90.5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-card">
                      <h3>📅 Attendance History</h3>
                      <div className="history-entries">
                        {[
                          {
                            date: "2024-02-14",
                            subject: "Mathematics",
                            status: "Present",
                          },
                          {
                            date: "2024-02-13",
                            subject: "Physics",
                            status: "Present",
                          },
                          {
                            date: "2024-02-12",
                            subject: "Chemistry",
                            status: "Late",
                          },
                          {
                            date: "2024-02-11",
                            subject: "Mathematics",
                            status: "Present",
                          },
                          {
                            date: "2024-02-10",
                            subject: "English",
                            status: "Absent",
                          },
                          {
                            date: "2024-02-09",
                            subject: "Physics",
                            status: "Present",
                          },
                        ].map((entry, index) => (
                          <div
                            key={index}
                            className={`history-entry ${entry.status.toLowerCase()}`}
                          >
                            <div className="entry-date">
                              {new Date(entry.date).toLocaleDateString()}
                            </div>
                            <div className="entry-subject">{entry.subject}</div>
                            <div
                              className={`entry-status ${entry.status.toLowerCase()}`}
                            >
                              {entry.status === "Present" && "✅"}
                              {entry.status === "Absent" && "❌"}
                              {entry.status === "Late" && "⏰"}
                              {entry.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard content - only show when currentPage is 'dashboard' */}
          {currentPage === "dashboard" && activeTab === "overview" && (
            <div className="overview-content">
              {/* Stats Grid */}
              <div className="stats-grid">
                <StatCard
                  title="Total Students"
                  value={mockData.stats.totalStudents}
                  icon="👥"
                  trend={5.2}
                />
                <StatCard
                  title="Total Teachers"
                  value={mockData.stats.totalTeachers}
                  icon="👨‍🏫"
                  trend={2.1}
                />
                <StatCard
                  title="Active Classes"
                  value={mockData.stats.totalClasses}
                  icon="📚"
                  trend={0}
                />
                <StatCard
                  title="Attendance Rate"
                  value={`${mockData.stats.attendance}%`}
                  icon="📊"
                  trend={1.8}
                />
              </div>

              {/* Content Grid */}
              <div className="content-grid">
                {/* Recent Activities */}
                <div className="widget">
                  <div className="widget-header">
                    <h3>Recent Activities</h3>
                    <button className="widget-action">View All</button>
                  </div>
                  <div className="widget-content">
                    {mockData.recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="widget">
                  <div className="widget-header">
                    <h3>Upcoming Events</h3>
                    <button className="widget-action">Add Event</button>
                  </div>
                  <div className="widget-content">
                    {mockData.upcomingEvents.map((event) => (
                      <div key={event.id} className="event-item">
                        <div className="event-date">
                          <span className="date">
                            {new Date(event.date).getDate()}
                          </span>
                          <span className="month">
                            {new Date(event.date).toLocaleDateString("en", {
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <p>{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "classes" && (
            <div className="classes-content">
              <div className="content-header">
                <h2>Classes Management</h2>
                <button className="btn-primary">Add New Class</button>
              </div>
              <div className="classes-grid">
                {mockData.classes.map((classItem) => (
                  <ClassCard key={classItem.id} classItem={classItem} />
                ))}
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "students" && (
            <div className="students-content">
              <div className="content-header">
                <h2>Students Management</h2>
                <button
                  className="btn-primary"
                  onClick={() => navigateToPage("addStudent")}
                >
                  Add New Student
                </button>
              </div>
              <div className="students-grid">
                {mockData.students.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "teachers" && (
            <div className="teachers-content">
              <div className="content-header">
                <h2>Teachers Management</h2>
                <button
                  className="btn-primary"
                  onClick={() => navigateToPage("addTeacher")}
                >
                  Add New Teacher
                </button>
              </div>
              <div className="teachers-grid">
                {mockData.teachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "attendance" && (
            <div className="attendance-content">
              <div className="content-header">
                <h2>Attendance Tracking</h2>
                <button className="btn-primary">Mark Attendance</button>
              </div>

              {/* Attendance Stats */}
              <div className="stats-grid" style={{ marginBottom: "2rem" }}>
                <StatCard
                  title="Present Today"
                  value={
                    mockData.attendance.filter(
                      (a) => a.date === "2024-02-14" && a.status === "Present",
                    ).length
                  }
                  icon="✅"
                  trend={2.5}
                />
                <StatCard
                  title="Absent Today"
                  value={
                    mockData.attendance.filter(
                      (a) => a.date === "2024-02-14" && a.status === "Absent",
                    ).length
                  }
                  icon="❌"
                  trend={-1.2}
                />
                <StatCard
                  title="Late Today"
                  value={
                    mockData.attendance.filter(
                      (a) => a.date === "2024-02-14" && a.status === "Late",
                    ).length
                  }
                  icon="⏰"
                  trend={0.5}
                />
                <StatCard
                  title="Attendance Rate"
                  value="92.5%"
                  icon="📊"
                  trend={1.8}
                />
              </div>

              {/* Attendance Filters */}
              <div className="attendance-filters">
                <div className="filter-group">
                  <label>Filter by Date:</label>
                  <select className="filter-select">
                    <option value="2024-02-14">Today (Feb 14)</option>
                    <option value="2024-02-13">Yesterday (Feb 13)</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Filter by Status:</label>
                  <select className="filter-select">
                    <option value="">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </div>
                <div className="attendance-summary">
                  <span className="attendance-count">
                    {mockData.attendance.length} Records
                  </span>
                </div>
              </div>

              {/* Attendance Grid */}
              <div className="attendance-grid">
                {mockData.attendance.map((attendance) => (
                  <AttendanceCard key={attendance.id} attendance={attendance} />
                ))}
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "grades" && (
            <div className="grades-content">
              <div className="content-header">
                <h2>Grades Management</h2>
                <button className="btn-primary">Add Grades</button>
              </div>

              {/* Grade Stats */}
              <div className="stats-grid" style={{ marginBottom: "2rem" }}>
                <StatCard
                  title="Average Grade"
                  value="B+"
                  icon="📈"
                  trend={3.2}
                />
                <StatCard
                  title="A Grades"
                  value={
                    mockData.grades.filter((g) => g.score / g.maxScore >= 0.9)
                      .length
                  }
                  icon="🏆"
                  trend={5.1}
                />
                <StatCard
                  title="Assignments Graded"
                  value={mockData.grades.length}
                  icon="📝"
                  trend={12.3}
                />
                <StatCard
                  title="Pass Rate"
                  value="94.2%"
                  icon="✅"
                  trend={2.7}
                />
              </div>

              {/* Grades Filters */}
              <div className="grades-filters">
                <div className="filter-group">
                  <label>Filter by Subject:</label>
                  <select className="filter-select">
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Literature">
                      English Literature
                    </option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Filter by Grade:</label>
                  <select className="filter-select">
                    <option value="">All Grades</option>
                    <option value="A">A (90-100%)</option>
                    <option value="B">B (80-89%)</option>
                    <option value="C">C (70-79%)</option>
                    <option value="D">D (60-69%)</option>
                    <option value="F">F (Below 60%)</option>
                  </select>
                </div>
                <div className="grades-summary">
                  <span className="grades-count">
                    {mockData.grades.length} Grades Recorded
                  </span>
                </div>
              </div>

              {/* Grades Grid */}
              <div className="grades-grid">
                {mockData.grades.map((gradeEntry) => (
                  <GradeCard key={gradeEntry.id} gradeEntry={gradeEntry} />
                ))}
              </div>
            </div>
          )}

          {currentPage === "dashboard" && activeTab === "events" && (
            <div className="events-content">
              <div className="content-header">
                <h2>Events Calendar</h2>
                <button className="btn-primary">Create Event</button>
              </div>
              <div className="events-filters">
                <div className="filter-group">
                  <label>Filter by Category:</label>
                  <select className="filter-select">
                    <option value="">All Categories</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div className="events-summary">
                  <span className="events-count">
                    {mockData.events.length} Events Scheduled
                  </span>
                </div>
              </div>
              <div className="events-grid">
                {mockData.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Modals */}
      {modals.eventRegistration && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register for {selectedItem?.title}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("eventRegistration")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="registration-form">
                <div className="form-group">
                  <label>Full Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Phone Number*</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Grade/Class</label>
                  <select>
                    <option value="">Select Grade</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Emergency Contact</label>
                  <input type="tel" placeholder="Emergency contact number" />
                </div>
                <div className="form-group">
                  <label>Special Requirements</label>
                  <textarea
                    placeholder="Any dietary restrictions, medical conditions, or special needs"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => closeModal("eventRegistration")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modals.gradeEdit && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Grade - {selectedItem?.studentName}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("gradeEdit")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="grade-edit-form">
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={selectedItem?.studentName || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Subject*</label>
                  <select defaultValue={selectedItem?.subject || ""}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Literature">
                      English Literature
                    </option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assignment/Test Name*</label>
                  <input
                    type="text"
                    defaultValue={selectedItem?.assignment || ""}
                    placeholder="Enter assignment name"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Score*</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.score || ""}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Score*</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.maxScore || 100}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Date*</label>
                  <input
                    type="date"
                    defaultValue={selectedItem?.date || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Comments</label>
                  <textarea
                    placeholder="Additional comments about performance"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => closeModal("gradeEdit")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Grade
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modals.attendanceHistory && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Attendance History - {selectedItem?.studentName}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("attendanceHistory")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="attendance-summary-stats">
                <div className="summary-card">
                  <h4>Present Days</h4>
                  <span className="stat-number present">18</span>
                </div>
                <div className="summary-card">
                  <h4>Absent Days</h4>
                  <span className="stat-number absent">2</span>
                </div>
                <div className="summary-card">
                  <h4>Late Days</h4>
                  <span className="stat-number late">1</span>
                </div>
                <div className="summary-card">
                  <h4>Attendance Rate</h4>
                  <span className="stat-number rate">90.5%</span>
                </div>
              </div>
              <div className="attendance-history-list">
                <div className="history-filters">
                  <select>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="thisYear">This Year</option>
                  </select>
                  <select>
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div className="history-entries">
                  {[
                    {
                      date: "2024-02-14",
                      subject: "Mathematics",
                      status: "Present",
                    },
                    {
                      date: "2024-02-13",
                      subject: "Physics",
                      status: "Present",
                    },
                    {
                      date: "2024-02-12",
                      subject: "Chemistry",
                      status: "Late",
                    },
                    {
                      date: "2024-02-11",
                      subject: "Mathematics",
                      status: "Present",
                    },
                    {
                      date: "2024-02-10",
                      subject: "English",
                      status: "Absent",
                    },
                    {
                      date: "2024-02-09",
                      subject: "Physics",
                      status: "Present",
                    },
                  ].map((entry, index) => (
                    <div
                      key={index}
                      className={`history-entry ${entry.status.toLowerCase()}`}
                    >
                      <div className="entry-date">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div className="entry-subject">{entry.subject}</div>
                      <div
                        className={`entry-status ${entry.status.toLowerCase()}`}
                      >
                        {entry.status === "Present" && "✅"}
                        {entry.status === "Absent" && "❌"}
                        {entry.status === "Late" && "⏰"}
                        {entry.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.classDetails && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Class Details - {selectedItem?.name}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("classDetails")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="class-overview">
                <div className="overview-stats">
                  <div className="stat-item">
                    <label>Total Students</label>
                    <span>{selectedItem?.students}</span>
                  </div>
                  <div className="stat-item">
                    <label>Subject</label>
                    <span>{selectedItem?.subject}</span>
                  </div>
                  <div className="stat-item">
                    <label>Teacher</label>
                    <span>{selectedItem?.teacher}</span>
                  </div>
                  <div className="stat-item">
                    <label>Average Grade</label>
                    <span>B+</span>
                  </div>
                </div>
              </div>
              <div className="class-tabs">
                <div className="tab-buttons">
                  <button className="tab-btn active">Students</button>
                  <button className="tab-btn">Schedule</button>
                  <button className="tab-btn">Assignments</button>
                  <button className="tab-btn">Performance</button>
                </div>
                <div className="tab-content">
                  <div className="students-list">
                    {mockData.students
                      .filter((s) => s.grade === selectedItem?.name)
                      .map((student) => (
                        <div key={student.id} className="student-row">
                          <div className="student-avatar-small">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="student-info-row">
                            <span className="student-name">{student.name}</span>
                            <span className="student-email">
                              {student.email}
                            </span>
                          </div>
                          <div className="student-gpa">GPA: {student.gpa}</div>
                          <button
                            className="btn-small"
                            onClick={() => openModal("studentProfile", student)}
                          >
                            View
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.teacherProfile && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Teacher Profile</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("teacherProfile")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <div className="profile-avatar">
                  {selectedItem?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="profile-info">
                  <h4>{selectedItem?.name}</h4>
                  <p className="profile-title">{selectedItem?.subject}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-group">
                  <label>Experience</label>
                  <span>{selectedItem?.experience}</span>
                </div>
                <div className="detail-group">
                  <label>Email</label>
                  <span>{selectedItem?.email}</span>
                </div>
                <div className="detail-group">
                  <label>Phone</label>
                  <span>{selectedItem?.phone}</span>
                </div>
                <div className="detail-group">
                  <label>Classes Teaching</label>
                  <div className="classes-list">
                    {selectedItem?.classes.map((className, index) => (
                      <span key={index} className="class-badge">
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="detail-group">
                  <label>Qualifications</label>
                  <span>
                    PhD in {selectedItem?.subject}, Master's in Education
                  </span>
                </div>
                <div className="detail-group">
                  <label>Office Hours</label>
                  <span>Monday - Friday, 2:00 PM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.studentGrades && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Student Grades - {selectedItem?.name}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("studentGrades")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="grades-overview">
                <div className="gpa-display">
                  <h4>Current GPA</h4>
                  <span className="gpa-large">{selectedItem?.gpa}</span>
                </div>
                <div className="grade-summary">
                  <div className="summary-item">
                    <label>A Grades</label>
                    <span>5</span>
                  </div>
                  <div className="summary-item">
                    <label>B Grades</label>
                    <span>3</span>
                  </div>
                  <div className="summary-item">
                    <label>C Grades</label>
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className="subject-grades">
                {mockData.grades
                  .filter((g) => g.studentName === selectedItem?.name)
                  .map((grade) => (
                    <div key={grade.id} className="grade-row">
                      <div className="grade-subject">{grade.subject}</div>
                      <div className="grade-assignment">{grade.assignment}</div>
                      <div className="grade-score">
                        <span className="score">
                          {grade.score}/{grade.maxScore}
                        </span>
                        <span className="percentage">
                          ({Math.round((grade.score / grade.maxScore) * 100)}%)
                        </span>
                      </div>
                      <div className="grade-date">
                        {new Date(grade.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.editStudentProfile && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Student Profile</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("editStudentProfile")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="student-edit-form">
                <div className="form-group">
                  <label>Full Name*</label>
                  <input
                    type="text"
                    defaultValue={selectedItem?.name || ""}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age*</label>
                    <input
                      type="number"
                      defaultValue={selectedItem?.age || ""}
                      min="5"
                      max="25"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade*</label>
                    <select defaultValue={selectedItem?.grade || ""}>
                      <option value="Grade 8A">Grade 8A</option>
                      <option value="Grade 8B">Grade 8B</option>
                      <option value="Grade 9A">Grade 9A</option>
                      <option value="Grade 9B">Grade 9B</option>
                      <option value="Grade 10A">Grade 10A</option>
                      <option value="Grade 10B">Grade 10B</option>
                      <option value="Grade 11A">Grade 11A</option>
                      <option value="Grade 11B">Grade 11B</option>
                      <option value="Grade 12A">Grade 12A</option>
                      <option value="Grade 12B">Grade 12B</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input
                    type="email"
                    defaultValue={selectedItem?.email || ""}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Parent/Guardian Name</label>
                  <input type="text" placeholder="Enter parent/guardian name" />
                </div>
                <div className="form-group">
                  <label>Parent Contact Number</label>
                  <input type="tel" placeholder="Enter parent contact number" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    placeholder="Enter home address"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Medical Information</label>
                  <textarea
                    placeholder="Any medical conditions, allergies, or special needs"
                    rows="2"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => closeModal("editStudentProfile")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modals.addStudent && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("addStudent")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="student-edit-form">
                <div className="form-section">
                  <h4 className="section-title">📝 Personal Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name*</label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name*</label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date of Birth*</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Gender*</label>
                      <select required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Student ID*</label>
                    <input
                      type="text"
                      placeholder="Enter unique student ID"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      placeholder="student@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter phone number" />
                  </div>
                  <div className="form-group">
                    <label>Home Address*</label>
                    <textarea
                      placeholder="Enter complete home address"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">🏫 Academic Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Grade/Class*</label>
                      <select required>
                        <option value="">Select Grade</option>
                        <option value="Grade 8A">Grade 8A</option>
                        <option value="Grade 8B">Grade 8B</option>
                        <option value="Grade 9A">Grade 9A</option>
                        <option value="Grade 9B">Grade 9B</option>
                        <option value="Grade 10A">Grade 10A</option>
                        <option value="Grade 10B">Grade 10B</option>
                        <option value="Grade 10C">Grade 10C</option>
                        <option value="Grade 11A">Grade 11A</option>
                        <option value="Grade 11B">Grade 11B</option>
                        <option value="Grade 11C">Grade 11C</option>
                        <option value="Grade 12A">Grade 12A</option>
                        <option value="Grade 12B">Grade 12B</option>
                        <option value="Grade 12C">Grade 12C</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enrollment Date*</label>
                      <input type="date" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Previous School</label>
                      <input type="text" placeholder="Previous school name" />
                    </div>
                    <div className="form-group">
                      <label>Transfer Grade/GPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        placeholder="Previous GPA (if applicable)"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Academic Track/Stream</label>
                    <select>
                      <option value="">Select Track</option>
                      <option value="science">Science Track</option>
                      <option value="arts">Arts/Humanities Track</option>
                      <option value="commerce">Commerce Track</option>
                      <option value="general">General Studies</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    👨‍👩‍👧‍👦 Parent/Guardian Information
                  </h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Father's Name*</label>
                      <input
                        type="text"
                        placeholder="Enter father's full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mother's Name*</label>
                      <input
                        type="text"
                        placeholder="Enter mother's full name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Father's Phone*</label>
                      <input
                        type="tel"
                        placeholder="Father's contact number"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mother's Phone*</label>
                      <input
                        type="tel"
                        placeholder="Mother's contact number"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Father's Email</label>
                      <input type="email" placeholder="father@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Mother's Email</label>
                      <input type="email" placeholder="mother@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Father's Occupation</label>
                      <input type="text" placeholder="Father's profession" />
                    </div>
                    <div className="form-group">
                      <label>Mother's Occupation</label>
                      <input type="text" placeholder="Mother's profession" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Primary Guardian*</label>
                    <select required>
                      <option value="">Select Primary Guardian</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="both">Both Parents</option>
                      <option value="other">Other Guardian</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact Name*</label>
                    <input
                      type="text"
                      placeholder="Emergency contact person"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact Phone*</label>
                    <input
                      type="tel"
                      placeholder="Emergency contact number"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    🏥 Medical & Special Information
                  </h4>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Medical Conditions</label>
                    <textarea
                      placeholder="Any chronic conditions, allergies, or medical history"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Current Medications</label>
                    <textarea
                      placeholder="List any medications the student is currently taking"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Dietary Restrictions</label>
                    <textarea
                      placeholder="Any food allergies or dietary requirements"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Special Needs/Accommodations</label>
                    <textarea
                      placeholder="Any learning disabilities, physical limitations, or special accommodations needed"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    🚌 Transportation & Additional Info
                  </h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Transportation Mode</label>
                      <select>
                        <option value="">Select Transportation</option>
                        <option value="school-bus">School Bus</option>
                        <option value="parent-pickup">Parent Pickup</option>
                        <option value="walking">Walking</option>
                        <option value="public-transport">
                          Public Transport
                        </option>
                        <option value="cycling">Cycling</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Bus Route Number</label>
                      <input
                        type="text"
                        placeholder="Bus route (if applicable)"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Extracurricular Interests</label>
                    <textarea
                      placeholder="Sports, arts, clubs, or activities the student is interested in"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea
                      placeholder="Any other important information about the student"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">📄 Document Checklist</h4>
                  <div className="document-checklist">
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Birth Certificate</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Previous School Transfer Certificate</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Medical Certificate</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Passport Size Photographs (4 copies)</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Parent/Guardian ID Proof</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Address Proof</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Previous Academic Records</span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => closeModal("addStudent")}
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn-secondary">
                    Save as Draft
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modals.contactTeacher && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact {selectedItem?.name}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("contactTeacher")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="teacher-contact-info">
                <div className="contact-card">
                  <div className="contact-header">
                    <div className="teacher-avatar">
                      {selectedItem?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="contact-details">
                      <h4>{selectedItem?.name}</h4>
                      <p className="teacher-subject">{selectedItem?.subject}</p>
                      <p className="teacher-experience">
                        {selectedItem?.experience} Experience
                      </p>
                    </div>
                  </div>

                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="contact-icon">📧</div>
                      <div className="contact-info">
                        <label>Email Address</label>
                        <a
                          href={`mailto:${selectedItem?.email}`}
                          className="contact-link"
                        >
                          {selectedItem?.email}
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">📞</div>
                      <div className="contact-info">
                        <label>Phone Number</label>
                        <a
                          href={`tel:${selectedItem?.phone}`}
                          className="contact-link"
                        >
                          {selectedItem?.phone}
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">🏫</div>
                      <div className="contact-info">
                        <label>Office Hours</label>
                        <span>Monday - Friday, 2:00 PM - 4:00 PM</span>
                      </div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">📚</div>
                      <div className="contact-info">
                        <label>Classes Teaching</label>
                        <div className="classes-list">
                          {selectedItem?.classes.map((className, index) => (
                            <span key={index} className="class-badge">
                              {className}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-section">
                <h4>📝 Send a Message</h4>
                <form className="contact-form">
                  <div className="form-group">
                    <label>Your Name*</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Email*</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Role*</label>
                    <select required>
                      <option value="">Select your role</option>
                      <option value="parent">Parent/Guardian</option>
                      <option value="student">Student</option>
                      <option value="administrator">Administrator</option>
                      <option value="teacher">Fellow Teacher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Subject*</label>
                    <select required>
                      <option value="">Select message type</option>
                      <option value="academic">Academic Inquiry</option>
                      <option value="schedule">Schedule Meeting</option>
                      <option value="student-progress">Student Progress</option>
                      <option value="assignment">Assignment Question</option>
                      <option value="behavioral">Behavioral Concern</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Priority Level</label>
                    <select>
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message*</label>
                    <textarea
                      placeholder="Please provide details about your inquiry or message..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Preferred Response Method</label>
                    <div className="response-methods">
                      <label className="checkbox-item">
                        <input
                          type="radio"
                          name="response-method"
                          value="email"
                          defaultChecked
                        />
                        <span>📧 Email Response</span>
                      </label>
                      <label className="checkbox-item">
                        <input
                          type="radio"
                          name="response-method"
                          value="phone"
                        />
                        <span>📞 Phone Call</span>
                      </label>
                      <label className="checkbox-item">
                        <input
                          type="radio"
                          name="response-method"
                          value="meeting"
                        />
                        <span>👥 In-Person Meeting</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Best Time to Contact</label>
                    <input
                      type="text"
                      placeholder="e.g., Weekdays 3-5 PM, Mornings only, etc."
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => closeModal("contactTeacher")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.classManagement && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                Manage {selectedItem?.name} - {selectedItem?.subject}
              </h3>
              <button
                className="modal-close"
                onClick={() => closeModal("classManagement")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="class-management-overview">
                <div className="management-stats">
                  <div className="stat-item">
                    <label>👥 Total Students</label>
                    <span>{selectedItem?.students}</span>
                  </div>
                  <div className="stat-item">
                    <label>👨‍🏫 Teacher</label>
                    <span>{selectedItem?.teacher}</span>
                  </div>
                  <div className="stat-item">
                    <label>📚 Subject</label>
                    <span>{selectedItem?.subject}</span>
                  </div>
                  <div className="stat-item">
                    <label>📊 Avg. Attendance</label>
                    <span>92.5%</span>
                  </div>
                </div>
              </div>

              <div className="management-tabs">
                <div className="tab-buttons">
                  <button
                    className={`tab-btn ${managementActiveTab === "students" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("students")}
                  >
                    👥 Students
                  </button>
                  <button
                    className={`tab-btn ${managementActiveTab === "assignments" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("assignments")}
                  >
                    📝 Assignments
                  </button>
                  <button
                    className={`tab-btn ${managementActiveTab === "schedule" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("schedule")}
                  >
                    📅 Schedule
                  </button>
                  <button
                    className={`tab-btn ${managementActiveTab === "attendance" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("attendance")}
                  >
                    📊 Attendance
                  </button>
                  <button
                    className={`tab-btn ${managementActiveTab === "grades" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("grades")}
                  >
                    🎯 Grades
                  </button>
                  <button
                    className={`tab-btn ${managementActiveTab === "resources" ? "active" : ""}`}
                    onClick={() => setManagementActiveTab("resources")}
                  >
                    📂 Resources
                  </button>
                </div>

                <div className="tab-content">
                  <div
                    className={`tab-panel ${managementActiveTab === "students" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Student Management</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">
                          Import Students
                        </button>
                        <button
                          className="btn-primary"
                          onClick={() => navigateToPage("addStudent")}
                        >
                          Add Student
                        </button>
                      </div>
                    </div>
                    <div className="students-management-list">
                      {mockData.students
                        .filter((s) => s.grade === selectedItem?.name)
                        .map((student) => (
                          <div
                            key={student.id}
                            className="management-student-row"
                          >
                            <div className="student-info-section">
                              <div className="student-avatar-small">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="student-details-mgmt">
                                <h5>{student.name}</h5>
                                <p>
                                  GPA: {student.gpa} | Age: {student.age}
                                </p>
                                <p>{student.email}</p>
                              </div>
                            </div>
                            <div className="student-actions-mgmt">
                              <button
                                className="btn-icon"
                                title="View Profile"
                                onClick={() =>
                                  openModal("studentProfile", student)
                                }
                              >
                                👤
                              </button>
                              <button
                                className="btn-icon"
                                title="View Grades"
                                onClick={() =>
                                  openModal("studentGrades", student)
                                }
                              >
                                📊
                              </button>
                              <button
                                className="btn-icon"
                                title="Edit"
                                onClick={() =>
                                  openModal("editStudentProfile", student)
                                }
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-icon danger"
                                title="Remove from Class"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    className={`tab-panel ${managementActiveTab === "assignments" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Assignment Management</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">
                          Import Assignments
                        </button>
                        <button className="btn-primary">
                          Create Assignment
                        </button>
                      </div>
                    </div>
                    <div className="assignments-list">
                      <div className="assignment-item">
                        <div className="assignment-info">
                          <h5>📝 Midterm Examination</h5>
                          <p>
                            <strong>Due:</strong> March 15, 2024
                          </p>
                          <p>
                            <strong>Type:</strong> Examination |{" "}
                            <strong>Weight:</strong> 30%
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="status-active">Active</span>
                          </p>
                        </div>
                        <div className="assignment-stats">
                          <span>Submitted: 18/28</span>
                          <span>Graded: 12/18</span>
                        </div>
                        <div className="assignment-actions">
                          <button className="btn-small">
                            View Submissions
                          </button>
                          <button className="btn-small">Edit</button>
                        </div>
                      </div>

                      <div className="assignment-item">
                        <div className="assignment-info">
                          <h5>📋 Chapter 5 Quiz</h5>
                          <p>
                            <strong>Due:</strong> March 8, 2024
                          </p>
                          <p>
                            <strong>Type:</strong> Quiz |{" "}
                            <strong>Weight:</strong> 10%
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="status-completed">Completed</span>
                          </p>
                        </div>
                        <div className="assignment-stats">
                          <span>Submitted: 28/28</span>
                          <span>Graded: 28/28</span>
                        </div>
                        <div className="assignment-actions">
                          <button className="btn-small">View Results</button>
                          <button className="btn-small">Archive</button>
                        </div>
                      </div>

                      <div className="assignment-item">
                        <div className="assignment-info">
                          <h5>📚 Research Project</h5>
                          <p>
                            <strong>Due:</strong> March 25, 2024
                          </p>
                          <p>
                            <strong>Type:</strong> Project |{" "}
                            <strong>Weight:</strong> 25%
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="status-draft">Draft</span>
                          </p>
                        </div>
                        <div className="assignment-stats">
                          <span>Submitted: 0/28</span>
                          <span>Graded: 0/0</span>
                        </div>
                        <div className="assignment-actions">
                          <button className="btn-small">Publish</button>
                          <button className="btn-small">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-panel ${managementActiveTab === "schedule" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Class Schedule</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">
                          Export Schedule
                        </button>
                        <button className="btn-primary">Add Session</button>
                      </div>
                    </div>
                    <div className="schedule-management">
                      <div className="schedule-week">
                        <div className="schedule-day">
                          <h5>Monday</h5>
                          <div className="time-slot">
                            <span className="time">9:00 - 10:30 AM</span>
                            <span className="room">Room 201</span>
                            <button className="btn-icon">✏️</button>
                          </div>
                          <div className="time-slot">
                            <span className="time">2:00 - 3:30 PM</span>
                            <span className="room">Lab 1</span>
                            <button className="btn-icon">✏️</button>
                          </div>
                        </div>

                        <div className="schedule-day">
                          <h5>Wednesday</h5>
                          <div className="time-slot">
                            <span className="time">10:45 - 12:15 PM</span>
                            <span className="room">Room 201</span>
                            <button className="btn-icon">✏️</button>
                          </div>
                        </div>

                        <div className="schedule-day">
                          <h5>Friday</h5>
                          <div className="time-slot">
                            <span className="time">11:00 AM - 12:30 PM</span>
                            <span className="room">Room 201</span>
                            <button className="btn-icon">✏️</button>
                          </div>
                          <div className="time-slot">
                            <span className="time">3:45 - 5:15 PM</span>
                            <span className="room">Lab 2</span>
                            <button className="btn-icon">✏️</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-panel ${managementActiveTab === "attendance" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Attendance Tracking</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">Export Report</button>
                        <button className="btn-primary">Mark Attendance</button>
                      </div>
                    </div>
                    <div className="attendance-management">
                      <div className="attendance-summary-cards">
                        <div className="summary-card">
                          <h5>Today's Attendance</h5>
                          <span className="stat-large">92.9%</span>
                          <span className="stat-detail">26/28 Present</span>
                        </div>
                        <div className="summary-card">
                          <h5>This Week</h5>
                          <span className="stat-large">94.2%</span>
                          <span className="stat-detail">132/140 Present</span>
                        </div>
                        <div className="summary-card">
                          <h5>This Month</h5>
                          <span className="stat-large">93.1%</span>
                          <span className="stat-detail">521/560 Present</span>
                        </div>
                      </div>
                      <div className="attendance-quick-view">
                        <h5>Recent Attendance Trends</h5>
                        <div className="trend-list">
                          <div className="trend-item">
                            <span>Mar 14: 96.4% (27/28)</span>
                            <span className="trend-up">↗</span>
                          </div>
                          <div className="trend-item">
                            <span>Mar 13: 89.3% (25/28)</span>
                            <span className="trend-down">↘</span>
                          </div>
                          <div className="trend-item">
                            <span>Mar 12: 92.9% (26/28)</span>
                            <span className="trend-up">↗</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-panel ${managementActiveTab === "grades" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Grade Management</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">
                          Export Gradebook
                        </button>
                        <button className="btn-primary">Add Grades</button>
                      </div>
                    </div>
                    <div className="grades-management">
                      <div className="grade-summary-stats">
                        <div className="summary-card">
                          <h5>Class Average</h5>
                          <span className="stat-large">B+</span>
                          <span className="stat-detail">3.7 GPA</span>
                        </div>
                        <div className="summary-card">
                          <h5>Highest Grade</h5>
                          <span className="stat-large">A+</span>
                          <span className="stat-detail">4.0 GPA</span>
                        </div>
                        <div className="summary-card">
                          <h5>Grade Distribution</h5>
                          <span className="stat-large">68%</span>
                          <span className="stat-detail">A/B Students</span>
                        </div>
                      </div>
                      <div className="recent-grades">
                        <h5>Recent Grade Entries</h5>
                        <div className="grade-entries-list">
                          {mockData.grades
                            .filter((g) => g.grade === selectedItem?.name)
                            .slice(0, 5)
                            .map((grade) => (
                              <div key={grade.id} className="grade-entry-item">
                                <div className="grade-student-info">
                                  <span className="student-name">
                                    {grade.studentName}
                                  </span>
                                  <span className="assignment-name">
                                    {grade.assignment}
                                  </span>
                                </div>
                                <div className="grade-score-info">
                                  <span className="score">
                                    {grade.score}/{grade.maxScore}
                                  </span>
                                  <span className="percentage">
                                    (
                                    {Math.round(
                                      (grade.score / grade.maxScore) * 100,
                                    )}
                                    %)
                                  </span>
                                </div>
                                <button
                                  className="btn-icon"
                                  onClick={() => openModal("gradeEdit", grade)}
                                >
                                  ✏️
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-panel ${managementActiveTab === "resources" ? "active" : ""}`}
                  >
                    <div className="panel-header">
                      <h4>Class Resources</h4>
                      <div className="panel-actions">
                        <button className="btn-secondary">Upload Files</button>
                        <button className="btn-primary">Create Folder</button>
                      </div>
                    </div>
                    <div className="resources-management">
                      <div className="resource-folders">
                        <div className="folder-item">
                          <div className="folder-icon">📁</div>
                          <div className="folder-info">
                            <h5>Lecture Notes</h5>
                            <span>12 files • 45.2 MB</span>
                          </div>
                          <button className="btn-small">Open</button>
                        </div>

                        <div className="folder-item">
                          <div className="folder-icon">📁</div>
                          <div className="folder-info">
                            <h5>Assignment Templates</h5>
                            <span>8 files • 12.8 MB</span>
                          </div>
                          <button className="btn-small">Open</button>
                        </div>

                        <div className="folder-item">
                          <div className="folder-icon">📁</div>
                          <div className="folder-info">
                            <h5>Reference Materials</h5>
                            <span>24 files • 156.3 MB</span>
                          </div>
                          <button className="btn-small">Open</button>
                        </div>
                      </div>

                      <div className="recent-files">
                        <h5>Recent Files</h5>
                        <div className="file-list">
                          <div className="file-item">
                            <span className="file-icon">📄</span>
                            <span className="file-name">
                              Chapter_5_Summary.pdf
                            </span>
                            <span className="file-date">2 hours ago</span>
                            <button className="btn-icon">⬇️</button>
                          </div>
                          <div className="file-item">
                            <span className="file-icon">📊</span>
                            <span className="file-name">Grade_Rubric.xlsx</span>
                            <span className="file-date">1 day ago</span>
                            <button className="btn-icon">⬇️</button>
                          </div>
                          <div className="file-item">
                            <span className="file-icon">🎥</span>
                            <span className="file-name">
                              Lab_Demo_Video.mp4
                            </span>
                            <span className="file-date">3 days ago</span>
                            <button className="btn-icon">⬇️</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.updateAttendanceStatus && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Attendance Status - {selectedItem?.studentName}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("updateAttendanceStatus")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="attendance-update-info">
                <div className="student-info-card">
                  <div className="student-avatar">
                    {selectedItem?.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="student-details">
                    <h4>{selectedItem?.studentName}</h4>
                    <p>{selectedItem?.grade}</p>
                    <p>{selectedItem?.subject}</p>
                    <p>{new Date(selectedItem?.date).toLocaleDateString()}</p>
                  </div>
                  <div
                    className={`current-status ${selectedItem?.status.toLowerCase()}`}
                  >
                    Current: {selectedItem?.status}
                  </div>
                </div>
              </div>

              <form className="attendance-update-form">
                <div className="form-group">
                  <label>Update Attendance Status*</label>
                  <div className="status-options">
                    <label className="status-option">
                      <input
                        type="radio"
                        name="status"
                        value="Present"
                        defaultChecked={selectedItem?.status === "Present"}
                      />
                      <div className="status-card present">
                        <span className="status-icon">✅</span>
                        <span className="status-label">Present</span>
                      </div>
                    </label>

                    <label className="status-option">
                      <input
                        type="radio"
                        name="status"
                        value="Absent"
                        defaultChecked={selectedItem?.status === "Absent"}
                      />
                      <div className="status-card absent">
                        <span className="status-icon">❌</span>
                        <span className="status-label">Absent</span>
                      </div>
                    </label>

                    <label className="status-option">
                      <input
                        type="radio"
                        name="status"
                        value="Late"
                        defaultChecked={selectedItem?.status === "Late"}
                      />
                      <div className="status-card late">
                        <span className="status-icon">⏰</span>
                        <span className="status-label">Late</span>
                      </div>
                    </label>

                    <label className="status-option">
                      <input type="radio" name="status" value="Excused" />
                      <div className="status-card excused">
                        <span className="status-icon">📋</span>
                        <span className="status-label">Excused</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Time of Arrival (if late)</label>
                  <input type="time" placeholder="Enter arrival time" />
                </div>

                <div className="form-group">
                  <label>Reason for Absence/Lateness</label>
                  <select>
                    <option value="">Select reason</option>
                    <option value="sick">Illness</option>
                    <option value="medical">Medical Appointment</option>
                    <option value="family">Family Emergency</option>
                    <option value="transport">Transportation Issues</option>
                    <option value="weather">Weather Related</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    placeholder="Add any additional notes about the attendance status..."
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Notification Options</label>
                  <div className="notification-options">
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>📧 Email parent/guardian</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>📱 Send SMS notification</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>📝 Add to student record</span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => closeModal("updateAttendanceStatus")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modals.gradeDetails && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Grade Details - {selectedItem?.assignment}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("gradeDetails")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="grade-details-overview">
                <div className="student-grade-header">
                  <div className="student-avatar">
                    {selectedItem?.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="student-grade-info">
                    <h4>{selectedItem?.studentName}</h4>
                    <p>
                      {selectedItem?.grade} - {selectedItem?.subject}
                    </p>
                  </div>
                  <div
                    className="grade-score-large"
                    style={{
                      backgroundColor: (() => {
                        const percentage =
                          (selectedItem?.score / selectedItem?.maxScore) * 100;
                        if (percentage >= 90) return "#10b981";
                        if (percentage >= 80) return "#3b82f6";
                        if (percentage >= 70) return "#f59e0b";
                        return "#ef4444";
                      })(),
                    }}
                  >
                    {(() => {
                      const percentage =
                        (selectedItem?.score / selectedItem?.maxScore) * 100;
                      if (percentage >= 97) return "A+";
                      if (percentage >= 93) return "A";
                      if (percentage >= 90) return "A-";
                      if (percentage >= 87) return "B+";
                      if (percentage >= 83) return "B";
                      if (percentage >= 80) return "B-";
                      if (percentage >= 77) return "C+";
                      if (percentage >= 73) return "C";
                      if (percentage >= 70) return "C-";
                      if (percentage >= 67) return "D+";
                      if (percentage >= 65) return "D";
                      return "F";
                    })()}
                  </div>
                </div>

                <div className="grade-metrics">
                  <div className="metric-card">
                    <h5>📊 Score Breakdown</h5>
                    <div className="score-details">
                      <div className="score-item">
                        <span>Raw Score:</span>
                        <span className="score-value">
                          {selectedItem?.score}/{selectedItem?.maxScore}
                        </span>
                      </div>
                      <div className="score-item">
                        <span>Percentage:</span>
                        <span className="score-value">
                          {Math.round(
                            (selectedItem?.score / selectedItem?.maxScore) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="score-item">
                        <span>Grade Point:</span>
                        <span className="score-value">
                          {(() => {
                            const percentage =
                              (selectedItem?.score / selectedItem?.maxScore) *
                              100;
                            if (percentage >= 97) return "4.0";
                            if (percentage >= 93) return "4.0";
                            if (percentage >= 90) return "3.7";
                            if (percentage >= 87) return "3.3";
                            if (percentage >= 83) return "3.0";
                            if (percentage >= 80) return "2.7";
                            if (percentage >= 77) return "2.3";
                            if (percentage >= 73) return "2.0";
                            if (percentage >= 70) return "1.7";
                            if (percentage >= 67) return "1.3";
                            if (percentage >= 65) return "1.0";
                            return "0.0";
                          })()}
                        </span>
                      </div>
                      <div className="score-item">
                        <span>Class Rank:</span>
                        <span className="score-value">3rd out of 28</span>
                      </div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <h5>📈 Performance Analysis</h5>
                    <div className="performance-stats">
                      <div className="stat-item">
                        <span>Class Average:</span>
                        <span>78.5%</span>
                      </div>
                      <div className="stat-item">
                        <span>Above Average:</span>
                        <span className="positive">
                          +
                          {Math.round(
                            (selectedItem?.score / selectedItem?.maxScore) *
                              100,
                          ) - 78.5}
                          %
                        </span>
                      </div>
                      <div className="stat-item">
                        <span>Highest Score:</span>
                        <span>96%</span>
                      </div>
                      <div className="stat-item">
                        <span>Improvement:</span>
                        <span className="positive">
                          +5% from last assignment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grade-details-content">
                <div className="detail-tabs">
                  <div className="tab-buttons">
                    <button className="tab-btn active">
                      📝 Assignment Info
                    </button>
                    <button className="tab-btn">📋 Rubric</button>
                    <button className="tab-btn">💬 Feedback</button>
                    <button className="tab-btn">📊 Analytics</button>
                  </div>

                  <div className="tab-content">
                    <div className="assignment-details">
                      <div className="detail-section">
                        <h5>📚 Assignment Information</h5>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>Assignment Name:</label>
                            <span>{selectedItem?.assignment}</span>
                          </div>
                          <div className="info-item">
                            <label>Subject:</label>
                            <span>{selectedItem?.subject}</span>
                          </div>
                          <div className="info-item">
                            <label>Date Submitted:</label>
                            <span>
                              {new Date(
                                selectedItem?.date,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="info-item">
                            <label>Due Date:</label>
                            <span>
                              {new Date(
                                selectedItem?.date,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="info-item">
                            <label>Assignment Type:</label>
                            <span>Written Assessment</span>
                          </div>
                          <div className="info-item">
                            <label>Weight in Course:</label>
                            <span>15%</span>
                          </div>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h5>🎯 Learning Objectives</h5>
                        <ul className="objectives-list">
                          <li>
                            Demonstrate understanding of core mathematical
                            concepts
                          </li>
                          <li>
                            Apply problem-solving strategies to complex
                            scenarios
                          </li>
                          <li>
                            Show work clearly with proper mathematical notation
                          </li>
                          <li>Analyze and interpret results accurately</li>
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h5>📋 Grading Criteria</h5>
                        <div className="criteria-breakdown">
                          <div className="criteria-item">
                            <span className="criteria-category">
                              Problem Solving (40%)
                            </span>
                            <span className="criteria-score">36/40</span>
                            <span className="criteria-percentage">90%</span>
                          </div>
                          <div className="criteria-item">
                            <span className="criteria-category">
                              Mathematical Reasoning (30%)
                            </span>
                            <span className="criteria-score">25/30</span>
                            <span className="criteria-percentage">83%</span>
                          </div>
                          <div className="criteria-item">
                            <span className="criteria-category">
                              Communication (20%)
                            </span>
                            <span className="criteria-score">17/20</span>
                            <span className="criteria-percentage">85%</span>
                          </div>
                          <div className="criteria-item">
                            <span className="criteria-category">
                              Accuracy (10%)
                            </span>
                            <span className="criteria-score">7/10</span>
                            <span className="criteria-percentage">70%</span>
                          </div>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h5>💬 Teacher Feedback</h5>
                        <div className="feedback-content">
                          <div className="feedback-section positive">
                            <h6>🌟 Strengths</h6>
                            <p>
                              Excellent problem-solving approach and clear
                              methodology. Mathematical reasoning shows strong
                              understanding of core concepts. Work is
                              well-organized and easy to follow.
                            </p>
                          </div>
                          <div className="feedback-section improvement">
                            <h6>🎯 Areas for Improvement</h6>
                            <p>
                              Pay closer attention to calculation accuracy,
                              especially in the final steps. Consider
                              double-checking arithmetic operations before
                              submitting.
                            </p>
                          </div>
                          <div className="feedback-section suggestions">
                            <h6>💡 Suggestions</h6>
                            <p>
                              Continue practicing similar problems to maintain
                              strong performance. Focus on developing systematic
                              checking procedures for calculations.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="detail-section">
                        <h5>🏆 Recognition & Achievements</h5>
                        <div className="achievements">
                          <div className="achievement-badge">
                            <span className="badge-icon">📈</span>
                            <span className="badge-text">
                              Top 10% Performance
                            </span>
                          </div>
                          <div className="achievement-badge">
                            <span className="badge-icon">⭐</span>
                            <span className="badge-text">
                              Consistent Excellence
                            </span>
                          </div>
                          <div className="achievement-badge">
                            <span className="badge-icon">🎯</span>
                            <span className="badge-text">
                              Learning Objective Mastery
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.eventDetails && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div
            className="modal-content large-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Event Details - {selectedItem?.title}</h3>
              <button
                className="modal-close"
                onClick={() => closeModal("eventDetails")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="event-details-header">
                <div
                  className="event-banner"
                  style={{
                    backgroundColor: (() => {
                      switch (selectedItem?.category) {
                        case "Academic":
                          return "#3b82f6";
                        case "Sports":
                          return "#ef4444";
                        case "Arts":
                          return "#8b5cf6";
                        case "Meeting":
                          return "#06b6d4";
                        case "Workshop":
                          return "#f59e0b";
                        case "Community":
                          return "#10b981";
                        default:
                          return "#6b7280";
                      }
                    })(),
                  }}
                >
                  <div className="event-banner-content">
                    <div className="event-category-large">
                      {(() => {
                        switch (selectedItem?.category) {
                          case "Academic":
                            return "📚";
                          case "Sports":
                            return "⚽";
                          case "Arts":
                            return "🎨";
                          case "Meeting":
                            return "👥";
                          case "Workshop":
                            return "🛠️";
                          case "Community":
                            return "🌱";
                          default:
                            return "📅";
                        }
                      })()}{" "}
                      {selectedItem?.category}
                    </div>
                    <h2>{selectedItem?.title}</h2>
                    <div className="event-meta">
                      <span>
                        📅{" "}
                        {new Date(selectedItem?.date).toLocaleDateString("en", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>🕒 {selectedItem?.time}</span>
                      <span>📍 {selectedItem?.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-details-content">
                <div className="content-sections">
                  <div className="main-content">
                    <div className="detail-section">
                      <h4>📋 Event Description</h4>
                      <p className="event-full-description">
                        {selectedItem?.description}
                      </p>

                      <div className="event-highlights">
                        <h5>✨ Event Highlights</h5>
                        <ul className="highlights-list">
                          {selectedItem?.category === "Academic" && (
                            <>
                              <li>
                                Interactive science demonstrations and
                                experiments
                              </li>
                              <li>
                                Student project presentations and displays
                              </li>
                              <li>Guest speakers from local universities</li>
                              <li>Hands-on learning activities for all ages</li>
                              <li>Awards ceremony for outstanding projects</li>
                            </>
                          )}
                          {selectedItem?.category === "Sports" && (
                            <>
                              <li>Track and field competitions</li>
                              <li>Team sports tournaments</li>
                              <li>Fun activities for all skill levels</li>
                              <li>Refreshments and healthy snacks</li>
                              <li>Awards for participation and achievement</li>
                            </>
                          )}
                          {selectedItem?.category === "Arts" && (
                            <>
                              <li>Live theatrical performance</li>
                              <li>Professional costumes and stage effects</li>
                              <li>Post-show meet and greet with cast</li>
                              <li>Behind-the-scenes theater tour</li>
                              <li>Photography opportunities</li>
                            </>
                          )}
                          {selectedItem?.category === "Meeting" && (
                            <>
                              <li>One-on-one teacher consultations</li>
                              <li>Academic progress discussions</li>
                              <li>Goal setting for upcoming semester</li>
                              <li>Resource recommendations</li>
                              <li>Q&A sessions with staff</li>
                            </>
                          )}
                          {(selectedItem?.category === "Workshop" ||
                            selectedItem?.category === "Community") && (
                            <>
                              <li>Interactive workshops and activities</li>
                              <li>Expert guest speakers</li>
                              <li>Networking opportunities</li>
                              <li>Resource materials and takeaways</li>
                              <li>Certificate of participation</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>🎯 Target Audience</h4>
                      <div className="audience-tags">
                        <span className="audience-tag">
                          Students (Grades 6-12)
                        </span>
                        <span className="audience-tag">
                          Parents & Guardians
                        </span>
                        <span className="audience-tag">Faculty & Staff</span>
                        {selectedItem?.category === "Community" && (
                          <span className="audience-tag">
                            Community Members
                          </span>
                        )}
                        {selectedItem?.category === "Academic" && (
                          <span className="audience-tag">
                            Science Enthusiasts
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>📝 Registration Information</h4>
                      <div className="registration-info">
                        <div className="info-row">
                          <span className="info-label">
                            Registration Status:
                          </span>
                          <span className="status-badge open">Open</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">
                            Registration Deadline:
                          </span>
                          <span>
                            {new Date(
                              new Date(selectedItem?.date).getTime() -
                                24 * 60 * 60 * 1000,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">
                            Current Registrations:
                          </span>
                          <span>{selectedItem?.participants} participants</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Maximum Capacity:</span>
                          <span>
                            {Math.floor(selectedItem?.participants * 1.2)}{" "}
                            participants
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Registration Fee:</span>
                          <span className="fee free">Free</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>🛡️ Safety & Requirements</h4>
                      <div className="requirements-list">
                        <div className="requirement-item">
                          <span className="req-icon">🧑‍🎓</span>
                          <span>
                            All participants must be current students or
                            pre-registered guests
                          </span>
                        </div>
                        <div className="requirement-item">
                          <span className="req-icon">📋</span>
                          <span>
                            Completed permission forms required for students
                            under 16
                          </span>
                        </div>
                        <div className="requirement-item">
                          <span className="req-icon">🏥</span>
                          <span>
                            Emergency contact information must be provided
                          </span>
                        </div>
                        {selectedItem?.category === "Sports" && (
                          <div className="requirement-item">
                            <span className="req-icon">👕</span>
                            <span>
                              Athletic wear and closed-toe shoes required
                            </span>
                          </div>
                        )}
                        {selectedItem?.category === "Academic" && (
                          <div className="requirement-item">
                            <span className="req-icon">🥽</span>
                            <span>
                              Safety goggles will be provided for lab activities
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-content">
                    <div className="info-card">
                      <h4>🏢 Organizer Information</h4>
                      <div className="organizer-info">
                        <div className="organizer-avatar">
                          {selectedItem?.organizer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h5>{selectedItem?.organizer}</h5>
                          <p>Event Coordinator</p>
                          <div className="contact-info">
                            <p>
                              📧{" "}
                              {selectedItem?.organizer
                                .toLowerCase()
                                .replace(/\s+/g, ".")}
                              @school.edu
                            </p>
                            <p>📞 (555) 123-4567</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="info-card">
                      <h4>📍 Venue Details</h4>
                      <div className="venue-info">
                        <h5>{selectedItem?.location}</h5>
                        <p>🏫 Main Campus Building</p>
                        <p>🚗 Parking available in Lot A</p>
                        <p>♿ Wheelchair accessible</p>
                        <p>🚌 Bus route #12 stops nearby</p>
                      </div>
                    </div>

                    <div className="info-card">
                      <h4>📋 Event Schedule</h4>
                      <div className="schedule-timeline">
                        <div className="timeline-item">
                          <span className="time">9:00 AM</span>
                          <span className="activity">
                            Registration & Check-in
                          </span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">9:30 AM</span>
                          <span className="activity">
                            Welcome & Opening Remarks
                          </span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">10:00 AM</span>
                          <span className="activity">
                            Main Activities Begin
                          </span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">12:00 PM</span>
                          <span className="activity">Lunch Break</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">1:00 PM</span>
                          <span className="activity">Afternoon Sessions</span>
                        </div>
                        <div className="timeline-item">
                          <span className="time">3:30 PM</span>
                          <span className="activity">Closing Ceremony</span>
                        </div>
                      </div>
                    </div>

                    <div className="info-card">
                      <h4>📞 Contact & Support</h4>
                      <div className="support-info">
                        <p>
                          <strong>Event Hotline:</strong>
                          <br />
                          📞 (555) 123-HELP
                        </p>
                        <p>
                          <strong>Email Support:</strong>
                          <br />
                          📧 events@school.edu
                        </p>
                        <p>
                          <strong>Emergency Contact:</strong>
                          <br />
                          🚨 (555) 911-HELP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-actions-section">
                  <div className="action-buttons">
                    <button className="btn-secondary">📤 Share Event</button>
                    <button className="btn-secondary">
                      📅 Add to Calendar
                    </button>
                    <button className="btn-secondary">📧 Email Details</button>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        closeModal("eventDetails");
                        openModal("eventRegistration", selectedItem);
                      }}
                    >
                      🎫 Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("schoolhub_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("schoolhub_user");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Optionally store in localStorage for persistence
    localStorage.setItem("schoolhub_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("schoolhub_user");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Loading SchoolHub...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

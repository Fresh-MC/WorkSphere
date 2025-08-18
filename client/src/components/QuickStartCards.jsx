import { FaBookOpen, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";

const quickStartOptions = [
  {
    title: "Learn a Skill",
    description: "Beginner? Start by building your first marketable skill.",
    icon: <FaBookOpen className="text-3xl text-primary group-hover:text-secondary transition-colors duration-300" />,
    action: "Start Learning",
    link: "/learn-skill",
  },
  {
    title: "Build Your Portfolio",
    description: "Already skilled? Showcase your work to attract clients.",
    icon: <FaBriefcase className="text-3xl text-primary group-hover:text-secondary transition-colors duration-300" />,
    action: "Create Portfolio",
    link: "/portfolio",
  },
  {
    title: "Get Your First Client",
    description: "Confident already? Learn how to land your very first paid project.",
    icon: <FaUserCheck className="text-3xl text-primary group-hover:text-secondary transition-colors duration-300" />,
    action: "Find Clients",
    link: "/clients",
  },
  {
    title: "Track Your Growth",
    description: "Measure progress, earn badges, and stay motivated.",
    icon: <FaChartLine className="text-3xl text-primary group-hover:text-secondary transition-colors duration-300" />,
    action: "View Dashboard",
    link: "/dashboard",
  },
];

export default function QuickStartCards() {
  return (
    <section className="w-full bg-[#F5F5F5] py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStartOptions.map((option, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-2xl p-6 
                         flex flex-col items-center text-center space-y-4
                         transition-all duration-300 ease-in-out
                         hover:shadow-2xl hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-gray-100"
            >
              {option.icon}
              <h3 className="text-xl font-semibold text-primary font-heading  group-hover:text-secondary transition-colors duration-300">
                {option.title}
              </h3>
              <p className="text-sm font-body text-gray-600">{option.description}</p>
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg mt-4 
                           hover:bg-secondary transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = option.link)}
              >
                {option.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

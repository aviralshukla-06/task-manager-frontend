// import React, { useState } from 'react';
// import { Plus, Home, LogOut, Trash2, Edit, CheckCircle2, Circle, Calendar, TrendingUp, ListTodo, Target } from 'lucide-react';

// export default function TaskManager() {
//     const [tasks, setTasks] = useState([
//         {
//             id: 1,
//             title: 'modify',
//             description: 'please modify my homepage',
//             completed: false,
//             createdAt: '17/10/2025',
//             color: 'from-yellow-400 to-orange-400'
//         }
//     ]);

//     const [showAddModal, setShowAddModal] = useState(false);
//     const [newTask, setNewTask] = useState({ title: '', description: '' });

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter(t => t.completed).length;
//     const pendingTasks = totalTasks - completedTasks;
//     const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//     const taskColors = [
//         'from-blue-400 to-purple-500',
//         'from-pink-400 to-rose-500',
//         'from-green-400 to-emerald-500',
//         'from-yellow-400 to-orange-400',
//         'from-indigo-400 to-blue-500',
//         'from-red-400 to-pink-500'
//     ];

//     const toggleTask = (id) => {
//         setTasks(tasks.map(task =>
//             task.id === id ? { ...task, completed: !task.completed } : task
//         ));
//     };

//     const deleteTask = (id) => {
//         setTasks(tasks.filter(task => task.id !== id));
//     };

//     const addTask = () => {
//         if (newTask.title.trim()) {
//             const randomColor = taskColors[Math.floor(Math.random() * taskColors.length)];
//             setTasks([...tasks, {
//                 id: Date.now(),
//                 title: newTask.title,
//                 description: newTask.description,
//                 completed: false,
//                 createdAt: new Date().toLocaleDateString('en-GB'),
//                 color: randomColor
//             }]);
//             setNewTask({ title: '', description: '' });
//             setShowAddModal(false);
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
//             {/* Animated Background */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
//                 <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
//             </div>

//             {/* Sidebar */}
//             <div className="relative w-80 bg-gradient-to-b from-purple-600/90 to-pink-600/90 backdrop-blur-xl shadow-2xl border-r border-white/10">
//                 <div className="p-8">
//                     <div className="flex items-center gap-3 mb-12">
//                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
//                             <Target className="w-7 h-7 text-purple-600" />
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-white">INFINITY</h1>
//                             <p className="text-purple-100 text-sm">Task Manager</p>
//                         </div>
//                     </div>

//                     {/* Stats Cards */}
//                     <div className="space-y-4 mb-8">
//                         <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
//                             <div className="flex items-center justify-between mb-2">
//                                 <ListTodo className="w-8 h-8 text-white" />
//                                 <span className="text-3xl font-bold text-white">{totalTasks}</span>
//                             </div>
//                             <p className="text-purple-100 font-medium">Total Tasks</p>
//                         </div>

//                         <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
//                             <div className="flex items-center justify-between mb-2">
//                                 <CheckCircle2 className="w-8 h-8 text-white" />
//                                 <span className="text-3xl font-bold text-white">{completedTasks}</span>
//                             </div>
//                             <p className="text-purple-100 font-medium">Completed</p>
//                         </div>

//                         <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
//                             <div className="flex items-center justify-between mb-2">
//                                 <TrendingUp className="w-8 h-8 text-white" />
//                                 <span className="text-3xl font-bold text-white">{completionRate}%</span>
//                             </div>
//                             <p className="text-purple-100 font-medium">Success Rate</p>
//                         </div>
//                     </div>

//                     {/* Navigation */}
//                     <nav className="space-y-3">
//                         <button
//                             onClick={() => setShowAddModal(true)}
//                             className="w-full flex items-center gap-4 px-6 py-4 bg-white text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//                         >
//                             <Plus className="w-6 h-6" />
//                             <span className="text-lg">Add Task</span>
//                         </button>

//                         <button className="w-full flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
//                             <Home className="w-6 h-6" />
//                             <span className="text-lg">Home</span>
//                         </button>
//                     </nav>
//                 </div>

//                 <div className="absolute bottom-8 left-8 right-8">
//                     <button className="w-full flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-red-500/50 transition-all duration-300 border border-white/20">
//                         <LogOut className="w-6 h-6" />
//                         <span className="text-lg">Logout</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 relative overflow-y-auto">
//                 <div className="p-12">
//                     {/* Header */}
//                     <div className="flex justify-between items-start mb-12">
//                         <div>
//                             <h2 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                                 Welcome Back!
//                             </h2>
//                             <p className="text-purple-200 text-xl">Let's make today productive ✨</p>
//                         </div>
//                         <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
//                             <p className="text-purple-200 text-sm font-medium mb-1">Today</p>
//                             <p className="text-white font-bold text-2xl">Friday</p>
//                             <p className="text-purple-200 text-lg">17/10/2025</p>
//                         </div>
//                     </div>

//                     {/* Tasks Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {tasks.map((task) => (
//                             <div
//                                 key={task.id}
//                                 className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//                             >
//                                 {/* Gradient Accent */}
//                                 <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${task.color} rounded-t-3xl`}></div>

//                                 <div className="flex justify-between items-start mb-4 mt-2">
//                                     <div className="flex items-center gap-3">
//                                         <button
//                                             onClick={() => toggleTask(task.id)}
//                                             className="flex-shrink-0 transition-transform hover:scale-110"
//                                         >
//                                             {task.completed ? (
//                                                 <CheckCircle2 className="w-7 h-7 text-green-400" />
//                                             ) : (
//                                                 <Circle className="w-7 h-7 text-purple-300" />
//                                             )}
//                                         </button>
//                                         <h3 className={`text-xl font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
//                                             {task.title}
//                                         </h3>
//                                     </div>
//                                     <button
//                                         onClick={() => deleteTask(task.id)}
//                                         className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
//                                     >
//                                         <Trash2 className="w-5 h-5 text-red-400" />
//                                     </button>
//                                 </div>

//                                 <p className={`mb-6 min-h-[60px] ${task.completed ? 'text-gray-400' : 'text-purple-100'}`}>
//                                     {task.description}
//                                 </p>

//                                 <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                                     <div className="flex items-center gap-2 text-purple-200">
//                                         <Calendar className="w-4 h-4" />
//                                         <span className="text-sm">{task.createdAt}</span>
//                                     </div>
//                                     <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
//                                         <Edit className="w-4 h-4 text-purple-300" />
//                                     </button>
//                                 </div>

//                                 {task.completed && (
//                                     <div className="absolute inset-0 bg-green-500/10 rounded-3xl pointer-events-none"></div>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Add Task Card */}
//                         <button
//                             onClick={() => setShowAddModal(true)}
//                             className="flex flex-col items-center justify-center min-h-[280px] bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-dashed border-white/20 hover:bg-white/10 hover:border-purple-400 transition-all duration-300 hover:scale-105 group"
//                         >
//                             <Plus className="w-16 h-16 text-purple-300 mb-4 group-hover:scale-110 transition-transform" />
//                             <p className="text-purple-200 text-lg font-semibold">Add New Task</p>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Add Task Modal */}
//             {showAddModal && (
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                     <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
//                         <h3 className="text-3xl font-bold text-white mb-6">Create New Task</h3>
//                         <input
//                             type="text"
//                             placeholder="Task title..."
//                             value={newTask.title}
//                             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                             className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                         />
//                         <textarea
//                             placeholder="Task description..."
//                             value={newTask.description}
//                             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                             className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[120px]"
//                         />
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={addTask}
//                                 className="flex-1 bg-white text-purple-600 px-6 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105"
//                             >
//                                 Add Task
//                             </button>
//                             <button
//                                 onClick={() => setShowAddModal(false)}
//                                 className="flex-1 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
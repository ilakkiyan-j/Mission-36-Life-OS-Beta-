(function () {
  const CHECKLIST_TEMPLATE = {
    1: { week: 1, title: "Azure AI Fundamentals", sections: [{ name: "AI-200", tasks: ["Azure AI Fundamentals", "Azure Portal Overview", "Azure Resource Groups", "Azure AI Services Overview"] }, { name: "Hands-on", tasks: ["Create Azure Account", "Explore Azure Portal"] }, { name: "IBM", tasks: ["Attend Session / Orientation", "Organize Notes"] }, { name: "Fitness", tasks: ["Morning Cardio", "Evening Workout", "10k Steps", "4L Water"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    2: { week: 1, title: "Azure Compute", sections: [{ name: "AI-200", tasks: ["Azure Compute", "Virtual Machines", "App Service", "Azure Functions Overview"] }, { name: "Lab", tasks: ["Create Web App"] }, { name: "IBM", tasks: ["Complete Daily Assignment"] }, { name: "Fitness", tasks: ["Cardio", "Push Workout"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    3: { week: 1, title: "Azure Storage", sections: [{ name: "AI-200", tasks: ["Azure Storage", "Blob Storage", "Azure Files", "Storage Accounts"] }, { name: "Lab", tasks: ["Upload Sample Files"] }, { name: "IBM", tasks: ["Notes + Practice"] }, { name: "Fitness", tasks: ["Legs", "Stretching"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    4: { week: 1, title: "Azure Networking", sections: [{ name: "AI-200", tasks: ["Azure Networking", "VNets", "Endpoints", "Security Basics"] }, { name: "Lab", tasks: ["Networking Demo"] }, { name: "IBM", tasks: ["Live Session"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    5: { week: 1, title: "Azure Identity", sections: [{ name: "AI-200", tasks: ["Azure Identity", "Microsoft Entra ID", "RBAC", "Authentication"] }, { name: "Lab", tasks: ["Create Users & Roles"] }, { name: "Fitness", tasks: ["Shoulders"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    6: { week: 1, title: "Azure Monitor", sections: [{ name: "AI-200", tasks: ["Azure Monitor", "Logging", "Metrics", "Alerts"] }, { name: "Lab", tasks: ["Monitor Resources"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    7: { week: 1, title: "Revision Day", sections: [{ name: "Revision Day", tasks: ["Revise Week 1", "Mini Mock Test", "Flashcards", "Fix Weak Areas"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    8: { week: 2, title: "Azure AI Studio", sections: [{ name: "AI-200", tasks: ["Azure AI Studio", "AI Foundry Overview", "AI Hub", "Projects"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    9: { week: 2, title: "Azure OpenAI", sections: [{ name: "AI-200", tasks: ["Azure OpenAI", "GPT Models", "Deployments", "Tokens"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    10: { week: 2, title: "Prompt Engineering", sections: [{ name: "AI-200", tasks: ["Prompt Engineering", "System Prompts", "Temperature", "Parameters"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    11: { week: 2, title: "Embeddings & Vector Search", sections: [{ name: "AI-200", tasks: ["Embeddings", "Vector Search", "Semantic Search"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    12: { week: 2, title: "Azure AI Search", sections: [{ name: "AI-200", tasks: ["Azure AI Search", "Search Index", "Indexers", "Skillsets"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    13: { week: 2, title: "Document Intelligence", sections: [{ name: "AI-200", tasks: ["Document Intelligence", "OCR", "Invoice Extraction", "Forms"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    14: { week: 2, title: "Revision", sections: [{ name: "Revision", tasks: ["Mock Test", "Review Labs", "Practice Questions"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    15: { week: 3, title: "Retrieval-Augmented Generation", sections: [{ name: "AI-200", tasks: ["Retrieval-Augmented Generation", "Architecture", "Knowledge Bases"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    16: { week: 3, title: "Chunking & Retrieval Pipeline", sections: [{ name: "AI-200", tasks: ["Chunking", "Embeddings", "Retrieval Pipeline"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    17: { week: 3, title: "Hybrid Search", sections: [{ name: "AI-200", tasks: ["Azure AI Search + OpenAI", "Hybrid Search", "Semantic Ranking"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    18: { week: 3, title: "Function Calling", sections: [{ name: "AI-200", tasks: ["Function Calling", "Tool Usage", "Structured Outputs"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    19: { week: 3, title: "AI Agents", sections: [{ name: "AI-200", tasks: ["AI Agents", "Multi-Agent Concepts", "Agent Workflows"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    20: { week: 3, title: "Responsible AI", sections: [{ name: "AI-200", tasks: ["Responsible AI", "Safety", "Content Filters", "Governance"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    21: { week: 3, title: "Revision", sections: [{ name: "Revision", tasks: ["Build Mini RAG Demo", "Mock Test"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    22: { week: 4, title: "AI Vision", sections: [{ name: "AI-200", tasks: ["AI Vision", "OCR", "Image Analysis"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    23: { week: 4, title: "Speech Services", sections: [{ name: "AI-200", tasks: ["Speech Services", "Speech-to-Text", "Text-to-Speech"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    24: { week: 4, title: "Language Services", sections: [{ name: "AI-200", tasks: ["Language Services", "Sentiment Analysis", "Translation"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    25: { week: 4, title: "Knowledge Mining", sections: [{ name: "AI-200", tasks: ["Knowledge Mining", "AI Search Integration"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    26: { week: 4, title: "Full Revision", sections: [{ name: "Revision", tasks: ["Full Revision", "Practice Questions"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    27: { week: 4, title: "Mock Exam", sections: [{ name: "Revision", tasks: ["Full-Length Mock Exam", "Review Mistakes"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    28: { week: 4, title: "Exam Day", sections: [{ name: "Exam", tasks: ["Quick Revision", "Take AI-200 Exam", "Celebrate Completion 🎉"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    29: { week: 5, title: "IBM Project Progress", sections: [{ name: "IBM", tasks: ["IBM Project Progress", "Clean Documentation"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    30: { week: 5, title: "Portfolio & LinkedIn", sections: [{ name: "Career", tasks: ["Improve GitHub README", "Update LinkedIn"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    31: { week: 5, title: "Portfolio Improvements", sections: [{ name: "Career", tasks: ["Portfolio Improvements", "Resume Review"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    32: { week: 5, title: "Microsoft SWE Prep", sections: [{ name: "Career", tasks: ["Microsoft SWE Preparation", "DSA (5 Problems)"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    33: { week: 5, title: "System Design Basics", sections: [{ name: "Career", tasks: ["System Design Basics", "REST API Review"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    34: { week: 5, title: "Final IBM Deliverables", sections: [{ name: "IBM", tasks: ["Final IBM Deliverables", "Documentation"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    35: { week: 5, title: "Internship Reflection", sections: [{ name: "Final", tasks: ["Internship Reflection", "Organize Certificates", "Backup Projects"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] },
    36: { week: 5, title: "Mission Complete", sections: [{ name: "Final", tasks: ["IBM Internship Completed", "AI-200 Certified", "Weight Goal Review (Target: 125 kg)", "Update Resume", "Update LinkedIn", "Push All Projects to GitHub", "Plan Mission 60"] }], daily: ["Morning Workout", "Evening Workout", "10,000 Steps", "Drink 4L Water", "Stay within 1500–1900 kcal", "Complete IBM Daily Tasks", "Study 2–3 Hours (AI-200 / Career)", "Revise Previous Topics (30 min)", "Sleep 7.5–8 Hours", "Update Mission 36 Progress"] }
  };

  const DEFAULT_DATA = {
    meta: { currentDay: 1, lastUpdated: new Date().toISOString() },
    progress: {},
    todos: {},
    globalNotes: ''
  };

  let data = JSON.parse(JSON.stringify(DEFAULT_DATA));
  let syncTimer = null;

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('mission36_data');
      if (stored) data = JSON.parse(stored);
    } catch (e) { console.warn('Failed to load local data', e); }
  }

  function saveToStorage() {
    try {
      localStorage.setItem('mission36_data', JSON.stringify(data));
    } catch (e) { console.warn('Failed to save local data', e); }
  }

  async function fetchFromGitHub() {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    if (!token || !repo) return null;
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/progress.json`, {
        headers: token ? { Authorization: `token ${token}` } : {}
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) { return null; }
  }

  async function pushToGitHub() {
    const token = localStorage.getItem('gh_token');
    const repo = localStorage.getItem('gh_repo');
    if (!token || !repo) return false;
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/contents/progress.json`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update progress ${new Date().toISOString()}`,
          content: btoa(JSON.stringify(data, null, 2)),
          sha: data.meta.sha || undefined
        })
      });
      if (!res.ok) throw new Error('GitHub API error');
      const result = await res.json();
      data.meta.sha = result.content.sha;
      if (window.MissionUI) window.MissionUI.setSyncStatus('Synced');
      return true;
    } catch (e) {
      console.warn('Sync failed', e);
      if (window.MissionUI) window.MissionUI.setSyncStatus('Offline');
      return false;
    }
  }

  async function init() {
    loadFromStorage();
    const remote = await fetchFromGitHub();
    if (remote) {
      data = remote;
      saveToStorage();
    }
    if (window.MissionUI) {
      window.MissionUI.renderChecklist();
      window.MissionUI.renderTodos();
      window.MissionUI.animateCounters();
    }
    if (window.GlobalNotesPanel && window.GlobalNotesPanel.load) {
      window.GlobalNotesPanel.load();
    }
  }

  function getChecklistTemplate(day) {
    return CHECKLIST_TEMPLATE[day] || null;
  }

  function getDayProgress(day) {
    return data.progress[day] || { completed: [], weight: null };
  }

  function toggleChecklistItem(day, itemId, checked) {
    if (!data.progress[day]) data.progress[day] = { completed: [], weight: null };
    const dayData = data.progress[day];
    if (checked && !dayData.completed.includes(itemId)) dayData.completed.push(itemId);
    if (!checked) dayData.completed = dayData.completed.filter((id) => id !== itemId);
    data.meta.lastUpdated = new Date().toISOString();
    saveToStorage();
    if (window.MissionUI) window.MissionUI.renderChecklist();
    debouncedSync();
  }

  function getTodos(day) {
    return data.todos[day] || [];
  }

  function addTodo(day, text) {
    if (!data.todos[day]) data.todos[day] = [];
    data.todos[day].push({ id: 't' + Date.now(), text, done: false });
    data.meta.lastUpdated = new Date().toISOString();
    saveToStorage();
    if (window.MissionUI) window.MissionUI.renderTodos();
    debouncedSync();
  }

  function toggleTodo(day, id, done) {
    const todos = data.todos[day] || [];
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.done = done;
    data.meta.lastUpdated = new Date().toISOString();
    saveToStorage();
    if (window.MissionUI) window.MissionUI.renderTodos();
    debouncedSync();
  }

  function deleteTodo(day, id) {
    if (!data.todos[day]) return;
    data.todos[day] = data.todos[day].filter((t) => t.id !== id);
    data.meta.lastUpdated = new Date().toISOString();
    saveToStorage();
    if (window.MissionUI) window.MissionUI.renderTodos();
    debouncedSync();
  }

  function debouncedSync() {
    if (window.MissionUI) window.MissionUI.setSyncStatus('Syncing...');
    clearTimeout(syncTimer);
    syncTimer = setTimeout(async () => {
      const ok = await pushToGitHub();
      if (!ok && window.MissionUI) window.MissionUI.setSyncStatus('Offline');
    }, 2000);
  }

  function getGlobalNotes() {
    return data.globalNotes || '';
  }

  function setGlobalNotes(text) {
    data.globalNotes = text;
    data.meta.lastUpdated = new Date().toISOString();
    saveToStorage();
    debouncedSync();
  }

  window.MissionData = {
    init,
    getChecklistTemplate,
    getDayProgress,
    toggleChecklistItem,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    getGlobalNotes,
    setGlobalNotes,
    progress: data.progress,
    todos: data.todos
  };
})();

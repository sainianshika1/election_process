/* ═══════════════════════════════════════════════════════════════
   CHAT.JS — AI Chatbot Module
   Uses local knowledge base for election Q&A
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initChat();
});

function initChat() {
  const widget = document.getElementById('chatWidget');
  const fab = document.getElementById('chatFab');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  const suggestions = document.querySelectorAll('.suggestion-btn');

  // Toggle chat
  fab.addEventListener('click', () => {
    widget.classList.toggle('open');
    if (widget.classList.contains('open')) {
      input.focus();
      if (messagesContainer.children.length === 0) {
        addBotMessage("Namaste! Welcome to the **Indian Election Assistant**.\n\nI can help you with voter registration, election process, voting day procedures, EVMs, results, and more.\n\nAsk me anything or tap a suggestion below!");
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('open');
  });

  // Submit message
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message);
    input.value = '';
    input.focus();

    showTyping();

    const delay = 300 + Math.random() * 500;
    setTimeout(() => {
      removeTyping();
      const response = getLocalResponse(message);
      addBotMessage(response);
    }, delay);
  });

  // Suggestion buttons
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.query;
      form.dispatchEvent(new Event('submit'));
    });
  });
}

// Message Rendering

function addUserMessage(text) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-message user';
  msg.innerHTML = `
    <div class="msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
    <div class="msg-bubble">${escapeHtml(text)}</div>
  `;
  container.appendChild(msg);
  scrollToBottom();
}

function addBotMessage(text) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-message bot';
  msg.innerHTML = `
    <div class="msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 12l3 3 5-5"/></svg></div>
    <div class="msg-bubble">${formatMarkdown(text)}</div>
  `;
  container.appendChild(msg);
  scrollToBottom();
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chat-message bot';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="msg-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 12l3 3 5-5"/></svg></div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(typing);
  scrollToBottom();
}

function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

function scrollToBottom() {
  const container = document.getElementById('chatMessages');
  container.scrollTop = container.scrollHeight;
}

// Text Formatting

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatMarkdown(text) {
  return text
    .replace(/^## (.*$)/gm, '<h3>$1</h3>')
    .replace(/^### (.*$)/gm, '<h4>$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--coral);text-decoration:underline;">$1</a>')
    .replace(/^• (.*$)/gm, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^[-:]+$/))) return '';
      const tag = match.includes('---') ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    })
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// Local Knowledge Base

function getLocalResponse(message) {
  const msg = message.toLowerCase();

  const localKB = [
    {
      patterns: ['hello', 'hi', 'hey', 'namaste', 'help'],
      response: "Namaste! I can help you with:\n\n• **Voter Registration** — How to register\n• **Election Process** — Step-by-step guide\n• **Voting Day** — What to expect\n• **EVM & VVPAT** — How machines work\n• **Results** — Counting process\n• **Eligibility** — Who can vote\n\nJust ask your question!"
    },
    {
      patterns: ['register', 'registration', 'voter id', 'form 6', 'how to register'],
      response: "**Voter Registration:**\n\n• **Online:** Visit voters.eci.gov.in - Fill Form 6\n• **App:** Download Voter Helpline App\n• **Offline:** Visit Electoral Registration Office\n\n**Documents:** Age proof, address proof, & photo needed.\nProcessing takes 15-30 days."
    },
    {
      patterns: ['eligible', 'who can vote', 'age', 'minimum age'],
      response: "**Eligibility:**\n\n• Indian citizen aged **18+**\n• Resident of the constituency\n• Not disqualified by law\n\nNRIs can register as overseas electors!"
    },
    {
      patterns: ['evm', 'vvpat', 'machine', 'electronic voting'],
      response: "**EVM & VVPAT:**\n\nEVM has a Control Unit + Ballot Unit. Voter presses button, gets a beep confirmation. VVPAT prints a paper slip visible for **7 seconds**. No internet/WiFi — completely standalone and secure!"
    },
    {
      patterns: ['process', 'steps', 'stages', 'how election'],
      response: "**Election Process:**\n\n1. Announcement & MCC\n2. Nomination filing\n3. Scrutiny & withdrawal\n4. Campaigning (stops 48hrs before poll)\n5. Polling Day (7AM-6PM)\n6. Counting Day\n7. Results & Government Formation"
    },
    {
      patterns: ['voting day', 'polling', 'how to vote', 'booth'],
      response: "**On Voting Day:**\n\n1. Go to your assigned booth\n2. Show Voter ID or alternate ID\n3. Get ink on left index finger\n4. Enter compartment\n5. Press button for your candidate\n6. Check VVPAT slip (7 sec)\n7. Exit!\n\nNo phones inside the booth."
    },
    {
      patterns: ['result', 'counting', 'winner'],
      response: "**Counting Process:**\n\nPostal ballots counted first, then EVMs round by round. VVPAT of 5 random booths verified. **272 seats** needed for Lok Sabha majority. Results available real-time on ECI website."
    },
    {
      patterns: ['nota', 'none of the above'],
      response: "**NOTA:** Option to reject all candidates (since 2013). Even if NOTA gets most votes, the candidate with highest votes still wins. It's a democratic way to express dissatisfaction."
    }
  ];

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of localKB) {
    for (const pattern of entry.patterns) {
      if (msg.includes(pattern) && pattern.length > bestScore) {
        bestScore = pattern.length;
        bestMatch = entry.response;
      }
    }
  }

  return bestMatch || "I can help with Indian elections! Try asking about **voter registration**, **election process**, **voting day**, **EVM**, **NOTA**, or **eligibility**.";
}

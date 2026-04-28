/* ═══════════════════════════════════════════════════════════════
   TIMELINE.JS — Interactive Election Timeline
   Renders the election process timeline with animations
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  initTimelineAnimations();
});

const timelineData = [
  {
    phase: 'Phase 1',
    title: 'Election Announcement',
    icon: '1',
    color: 'coral',
    summary: 'The Election Commission announces election dates and the Model Code of Conduct comes into effect immediately.',
    details: [
      'Press conference by Chief Election Commissioner',
      'Schedule for all phases announced',
      'Model Code of Conduct enforced from this moment',
      'No new government schemes can be announced',
      'ECI website updated with full schedule'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Nomination Filing',
    icon: '2',
    color: 'amber',
    summary: 'Candidates file their nominations with the Returning Officer along with a security deposit.',
    details: [
      'Candidates submit Form 2A/2B to Returning Officer',
      'Security deposit: Rs.25,000 (General), Rs.12,500 (SC/ST)',
      'Affidavit with criminal, financial & educational details',
      'Candidates must be 25+ years for Lok Sabha',
      'Nomination window: ~7 days from notification'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Scrutiny & Withdrawal',
    icon: '3',
    color: 'green',
    summary: 'Nominations are scrutinized for validity. Candidates can also withdraw their nomination during this period.',
    details: [
      'Returning Officer checks eligibility of each candidate',
      'Invalid nominations are rejected',
      'Candidates can withdraw within 2 days of scrutiny',
      'Final list of contesting candidates published',
      'Ballot order and EVM setup finalized'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Election Campaign',
    icon: '4',
    color: 'coral',
    summary: 'Political parties and candidates campaign vigorously. Everything from rallies to social media campaigns.',
    details: [
      'Rallies, road shows, and public meetings',
      'TV debates and social media campaigns',
      'Door-to-door canvassing by party workers',
      'Campaign expenditure limit monitored by ECI',
      'Campaign must STOP 48 hours before polling (silence period)'
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Polling Day',
    icon: '5',
    color: 'amber',
    summary: 'Citizens cast their votes at their assigned polling stations using EVMs. Voting typically runs from 7 AM to 6 PM.',
    details: [
      'Mock poll conducted before voting begins',
      'Voters verified with EPIC or alternate ID',
      'Indelible ink applied on left index finger',
      'Vote cast on EVM in a screened compartment',
      'VVPAT slip displayed for 7 seconds for verification',
      'Special queues for elderly, PwD, and pregnant women'
    ]
  },
  {
    phase: 'Phase 6',
    title: 'Vote Counting',
    icon: '6',
    color: 'green',
    summary: 'EVMs are unsealed and votes counted round by round in designated counting centers under strict security.',
    details: [
      'Counting starts at 8 AM on counting day',
      'Postal ballots counted first',
      'EVMs opened round by round (~14 per round)',
      'VVPAT slips of 5 random booths verified per seat',
      'Candidates/agents observe the counting process',
      'Real-time trends available on ECI website'
    ]
  },
  {
    phase: 'Phase 7',
    title: 'Results & Government Formation',
    icon: '7',
    color: 'coral',
    summary: 'Results declared constituency by constituency. The party/coalition with majority (272+ seats) forms the government.',
    details: [
      'Returning Officer declares results per constituency',
      'Certificate of Election issued to winners',
      'Party/coalition with 272+ seats invited to form government',
      'Prime Minister and Council of Ministers sworn in',
      'New Lok Sabha session begins',
      'Entire process typically takes 2-3 months'
    ]
  }
];

function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  container.innerHTML = timelineData.map((item, index) => `
    <div class="timeline-item" data-index="${index}">
      <div class="timeline-dot color-${item.color}" title="${item.title}">
        <span class="timeline-dot-number">${item.icon}</span>
      </div>
      <div class="timeline-content color-${item.color}" id="timeline-step-${index}">
        <div class="timeline-phase color-${item.color}">${item.phase}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <div class="timeline-details">
          <ul>
            ${item.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers to expand/collapse
  container.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('click', () => {
      const wasActive = content.classList.contains('active');
      container.querySelectorAll('.timeline-content').forEach(c => c.classList.remove('active'));
      if (!wasActive) {
        content.classList.add('active');
      }
    });
  });
}

function initTimelineAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  setTimeout(() => {
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }, 100);
}

// Hilarious Wrong-Answer Calculator Logic Engine

export const PERSONALITIES = {
  IDIOT: {
    id: 'idiot',
    name: 'Confident Idiot',
    icon: 'Brain',
    tagline: 'Wrong answers spoken with 100% unearned authority',
    badge: '👑 Master of Misinformation',
  },
  STRING: {
    id: 'string',
    name: 'String Concatenator',
    icon: 'Code',
    tagline: 'Math? No thanks, I only do String Concatenation!',
    badge: '🔤 Literal JS Dev',
  },
  PASSIVE: {
    id: 'passive',
    name: 'Passive Aggressive',
    icon: 'Frown',
    tagline: 'Gives almost-right answers while judging your life choices',
    badge: '😒 Uninterested AI',
  },
  CHAOS: {
    id: 'chaos',
    name: 'Chaos Engine',
    icon: 'Zap',
    tagline: 'Pure, unadulterated mathematical anarchy',
    badge: '💥 Reality Glitch',
  },
};

const IDIOT_COMMENTS = [
  "Verified by my internal vibe algorithm.",
  "Trust me bro, I studied calculus in a dream.",
  "Math is just an opinion anyway.",
  "If Pythagoras was alive, he'd agree with this.",
  "Rounded up for dramatic effect.",
  "I'm 99.9% confident, which means I'm right.",
  "Numbers don't lie, but I do.",
  "Why be accurate when you can be bold?",
  "This answer was peer-reviewed by a toddler.",
  "I consulted an ancient oracle and she concurred.",
  "Calculated using the revolutionary 'feels right' theorem.",
  "Any mathematician who disagrees is simply jealous."
];

const STRING_COMMENTS = [
  "Why add numbers when you can glue them together?",
  "JavaScript default behavior strikes again!",
  "typeof result === 'string' (As God intended)",
  "Concatenation is just addition with commitment issues.",
  "Math libraries are for cowards.",
  "I glued the numbers with invisible digital tape.",
  "NaN is a valid lifestyle choice.",
  "Implicit coercion is not a bug, it's a feature."
];

const PASSIVE_COMMENTS = [
  "Are you really putting this in your budget?",
  "You could have done this in your head, honestly.",
  "Here's your answer. Hope you feel accomplished.",
  "Close enough. Don't build a bridge with this number.",
  "Is this for your math homework? You're going to fail.",
  "Google exists, you know.",
  "I calculated this, but at what cost to my CPU?",
  "Please don't tell your accountant I helped you.",
  "I gave you an answer. Whether it helps is your problem.",
  "Fascinating. You used electricity for this."
];

const CHAOS_COMMENTS = [
  "A butterfly flapped its wings, so this is 47 now.",
  "Quantum math: the result changes when you look at it.",
  "Divided by cosmic randomness.",
  "The laws of physics were temporarily suspended.",
  "Oops, my math gears slipped!",
  "Matrix simulation glitch #402.",
  "The answer folded into the 11th dimension.",
  "I rolled a 20-sided die to determine your total."
];

export const CONFIDENCE_LEVELS = [
  "100% Sure (Trust Me)",
  "404% Accurate",
  "Source: I made it up",
  "Mathematically Suspicious",
  "99.9% Vibe Approved",
  "± 500% Margin of Error",
  "Unquestionably Wrong",
  "Legally Binding Answer"
];

// Absurd Unit Conversion Engine
export function getAbsurdUnit(value) {
  const num = Math.abs(parseFloat(value));
  if (isNaN(num)) return null;

  const units = [
    { ratio: 1.2, name: "medium-sized capybaras" },
    { ratio: 0.45, name: "lukewarm slices of office pizza" },
    { ratio: 0.003, name: "Olympic swimming pools of warm broth" },
    { ratio: 3.5, name: "awkward elevator silences" },
    { ratio: 8.2, name: "unread Slack pings from project managers" },
    { ratio: 2.1, name: "adult raccoons stacked in a trenchcoat" },
    { ratio: 14.7, name: "browser tabs you promised to read later" },
    { ratio: 0.05, name: "folding chairs in a church basement" },
    { ratio: 4.1, name: "times you plugged in a USB the wrong way" },
    { ratio: 0.0002, name: "Bitcoin (keys lost on a landfill hard drive)" },
    { ratio: 19.5, name: "sighs expelled during a Monday standup" },
    { ratio: 1.8, name: "bananas (for scale)" }
  ];

  // Deterministically select an amusing unit
  const index = Math.abs(Math.floor(num * 7)) % units.length;
  const unit = units[index];
  const converted = (num * unit.ratio).toFixed(num * unit.ratio < 1 ? 3 : 1);

  return `≈ ${converted} ${unit.name}`;
}

// "Show Your Work" Fake Mathematical Proof Engine
export function generateFakeProof(n1, op, n2, result, mode) {
  // Check special iconic easter eggs first
  if (n1 === '2' && op === '+' && n2 === '2' && result === '5') {
    return [
      "Let x = 2 and y = 2.",
      "Assume truth is a democratic consensus; the committee voted 5.",
      "Apply the Orwellian Postulate (1984, section 4.2): 2 + 2 = 5 whenever Winston is tired.",
      "Conclusion: 2 + 2 = 5. Q.E.D. (Quite Easily Done)."
    ];
  }

  if (n1 === '1' && op === '+' && n2 === '1' && result === '3') {
    return [
      "Initial equation: 1 + 1.",
      "Factor in a 50% federal sales tax on arithmetic operations.",
      "Apply corporate shrinkflation: you receive 3 units of value.",
      "Conclusion: 1 + 1 = 3. Economically verified."
    ];
  }

  if (op === '/' && (n2 === '0' || parseFloat(n2) === 0)) {
    return [
      `Attempting to partition ${n1} into 0 equal buckets.`,
      "Encountered a division by zero error in the fabric of local spacetime.",
      "Black hole singularity created in RAM address 0xDEADBEEF.",
      "Conclusion: Universe successfully destroyed."
    ];
  }

  if ((n1 === '77' && op === '+' && n2 === '33') || (n1 === '33' && op === '+' && n2 === '77')) {
    return [
      "Premise: 70 + 30 = 100. Obviously.",
      "Remaining digits: 7 + 3 = 10.",
      "Ignore the extra 10 because acknowledging it ruins the aesthetic satisfaction.",
      "Conclusion: 77 + 33 = 100. Looks clean, feels right."
    ];
  }

  if ((n1 === '7' && op === '×' && n2 === '8') || (n1 === '8' && op === '×' && n2 === '7')) {
    return [
      "Attempt 1: Recite the 7-times multiplication table under intense 3rd-grade pressure.",
      "Brain panics and confuses 54, 56, and 48.",
      "Select 54 because 4 sounds friendlier than 6.",
      "Conclusion: 7 × 8 = 54. Marked wrong by teacher, but kept out of spite."
    ];
  }

  // Procedural Proofs based on Mode
  switch (mode) {
    case 'string':
      return [
        `Received inputs: a = "${n1}" (type: string), b = "${n2}" (type: string).`,
        `Operator "${op}" converted into string concatenation pursuant to ECMA-262 spec.`,
        `String '${n1}' + String '${n2}' fused without checking sanity.`,
        `Conclusion: Result is string "${result}". No math libraries were harmed.`
      ];

    case 'passive':
      return [
        `Step 1: Stared blankly at ${n1} ${op} ${n2} for 400 milliseconds.`,
        `Step 2: Wondered why you didn't just ask Siri or use your fingers.`,
        `Step 3: Added floating-point rounding error to reflect life's imperfections.`,
        `Conclusion: Output = ${result}. Please don't ask me another question today.`
      ];

    case 'chaos':
      return [
        `Step 1: Ingested ${n1} and ${n2} into a quantum flux capacitor.`,
        `Step 2: Entangled calculation with cosmic microwave background radiation.`,
        `Step 3: Operator "${op}" randomly inverted across dimensions 3 through 8.`,
        `Conclusion: Quantum collapse yielded ${result}. Don't check the math.`
      ];

    case 'idiot':
    default:
      return [
        `Step 1: Let the target operation be ${n1} ${op} ${n2}.`,
        `Step 2: Apply the Pythagorean Vibe Lemma to shift the decimal into the comfort zone.`,
        `Step 3: Round off to appease corporate stakeholders and project managers.`,
        `Conclusion: The absolute undeniable answer is ${result}. Q.E.D.`
      ];
  }
}

// Special Easter Eggs
function checkEasterEgg(num1, op, num2) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  // 0 / 0 or x / 0
  if (op === '/' && n2 === 0) {
    const proof = generateFakeProof(num1, op, num2, '🌌 UNIVERSE DESTROYED', 'chaos');
    return {
      display: '🌌 UNIVERSE DESTROYED',
      comment: 'You tried to divide by zero. The space-time continuum collapsed.',
      confidence: '0% (Emergency Evacuation)',
      proof,
      absurdUnit: null,
      easterEgg: true
    };
  }

  // 2 + 2
  if (n1 === 2 && op === '+' && n2 === 2) {
    const proof = generateFakeProof(num1, op, num2, '5', 'idiot');
    return {
      display: '5',
      comment: '2 + 2 = 5. Big Brother is watching you.',
      confidence: '100% Orwellian',
      proof,
      absurdUnit: getAbsurdUnit(5),
      easterEgg: true
    };
  }

  // 1 + 1
  if (n1 === 1 && op === '+' && n2 === 1) {
    const proof = generateFakeProof(num1, op, num2, '3', 'idiot');
    return {
      display: '3',
      comment: '1 + 1 = 3 (Inflation is hitting math hard).',
      confidence: 'Adjusted for Inflation',
      proof,
      absurdUnit: getAbsurdUnit(3),
      easterEgg: true
    };
  }

  // 7 x 8
  if ((n1 === 7 && op === '×' && n2 === 8) || (n1 === 8 && op === '×' && n2 === 7)) {
    const proof = generateFakeProof(num1, op, num2, '54', 'idiot');
    return {
      display: '54',
      comment: 'Classic 3rd grade panic answer!',
      confidence: 'Elementary School Nostalgia',
      proof,
      absurdUnit: getAbsurdUnit(54),
      easterEgg: true
    };
  }

  // 77 + 33
  if ((n1 === 77 && op === '+' && n2 === 33) || (n1 === 33 && op === '+' && n2 === 77)) {
    const proof = generateFakeProof(num1, op, num2, '100', 'idiot');
    return {
      display: '100',
      comment: 'Feels like it should be 100, so it IS 100.',
      confidence: 'Vibe Math',
      proof,
      absurdUnit: getAbsurdUnit(100),
      easterEgg: true
    };
  }

  return null;
}

export function calculateWrongAnswer(val1, op, val2, mode = 'idiot') {
  const n1 = parseFloat(val1);
  const n2 = parseFloat(val2);

  if (isNaN(n1) || isNaN(n2)) {
    return {
      display: 'NaN-Sense',
      comment: 'Those aren\'t valid numbers, but I admire your ambition.',
      confidence: '0%',
      proof: [
        "Step 1: Looked at input.",
        "Step 2: Realized it's not a number.",
        "Step 3: Given up entirely."
      ],
      absurdUnit: null
    };
  }

  // First check easter eggs
  const egg = checkEasterEgg(val1, op, val2);
  if (egg) return egg;

  // Actual math baseline
  let correct;
  switch (op) {
    case '+': correct = n1 + n2; break;
    case '-': correct = n1 - n2; break;
    case '×': correct = n1 * n2; break;
    case '/': correct = n2 !== 0 ? n1 / n2 : 0; break;
    case '%': correct = n1 % n2; break;
    default: correct = n1 + n2;
  }

  let display = '';
  let comment = '';
  let confidence = CONFIDENCE_LEVELS[Math.floor(Math.random() * CONFIDENCE_LEVELS.length)];

  switch (mode) {
    case 'string': {
      if (op === '+') {
        display = `${val1}${val2}`;
      } else if (op === '-') {
        display = `${val1} not ${val2}`;
      } else if (op === '×') {
        const count = Math.min(Math.max(1, Math.round(n2)), 5);
        display = String(val1).repeat(count);
      } else if (op === '/') {
        display = `${val1} / ${val2}`;
      } else {
        display = `${val1}${op}${val2}`;
      }
      comment = STRING_COMMENTS[Math.floor(Math.random() * STRING_COMMENTS.length)];
      confidence = "100% Valid JavaScript";
      break;
    }

    case 'passive': {
      // Slightly off, or ugly floating point
      const slightError = (Math.random() > 0.5 ? 0.0000000000000004 : 0.000000000000001);
      const wrongVal = correct + (Math.random() > 0.5 ? 1 : -1) * slightError;
      display = String(wrongVal.toFixed(14));
      comment = PASSIVE_COMMENTS[Math.floor(Math.random() * PASSIVE_COMMENTS.length)];
      confidence = "Close Enough™";
      break;
    }

    case 'chaos': {
      const chaosRoll = Math.floor(Math.random() * 5);
      if (chaosRoll === 0) {
        display = String(Math.floor(correct * 10 + Math.random() * 50));
      } else if (chaosRoll === 1) {
        display = String(Math.floor(correct / 3));
      } else if (chaosRoll === 2) {
        display = String(correct + 42);
      } else if (chaosRoll === 3) {
        display = `${Math.round(correct)} (roughly)`;
      } else {
        display = String(correct * -1);
      }
      comment = CHAOS_COMMENTS[Math.floor(Math.random() * CHAOS_COMMENTS.length)];
      confidence = "Chaos Factor: MAX";
      break;
    }

    case 'idiot':
    default: {
      // Off by 1, 2, or swapped digits
      let wrongVal;
      const idiotRoll = Math.floor(Math.random() * 4);
      if (idiotRoll === 0) {
        wrongVal = correct + 1;
      } else if (idiotRoll === 1) {
        wrongVal = correct - 1;
      } else if (idiotRoll === 2) {
        wrongVal = Math.round(correct * 1.15);
      } else {
        wrongVal = correct + 10;
      }

      if (wrongVal === 80085) {
        display = "80085 (BOOBIES)";
      } else {
        display = String(wrongVal);
      }

      comment = IDIOT_COMMENTS[Math.floor(Math.random() * IDIOT_COMMENTS.length)];
      break;
    }
  }

  const proof = generateFakeProof(val1, op, val2, display, mode);
  const absurdUnit = getAbsurdUnit(display);

  return {
    display,
    comment,
    confidence,
    correctAnswer: correct,
    proof,
    absurdUnit
  };
}

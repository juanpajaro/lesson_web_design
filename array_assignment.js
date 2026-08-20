const users = [

  { id: 101, name: " Ada ", scores: [10, 20, 30] },

  { id: 102, name: "", scores: [5, 0, 15] },

  { id: 103, name: null, scores: [7, 14] },

  { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },

  { id: 105, name: "Grace", scores: [] }

];

function normalizeName(value) {
  // Check if the value is undefined (using typeof as requested) or null
  if (typeof value === "undefined" || value === null) {
    return "Unknown";
  }

  // Ensure the value is a string before attempting to call .trim()
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    
    // If it trims down to an empty string, return "Unknown"
    if (trimmedValue === "") {
      return "Unknown";
    }
    
    // Otherwise, return the properly trimmed string
    return trimmedValue;
  }

  // Fallback for any other unexpected data types
  return "Unknown";
}

function averageScore(scores) {
  // 1. If not an array: throw an error
  if (!Array.isArray(scores)) {
    throw new Error("scores must be an array");
  }


  // 2. If empty array: return null
  if (scores.length === 0) {
    return null;
  }

  // 3. Calculate the sum of the scores
  const sum = scores.reduce((total, current) => total + current, 0);
  
  // 4. Calculate the average
  const average = sum / scores.length;


  // 5. Return average rounded to 2 decimals using Math.round()
  return Math.round(average * 100) / 100;
}

function buildUserSummary(user) {
    // if not a non-null object, throw an error
    if (typeof user !== "object" || user === null) {
        throw new Error("user must be an object");
    }
    // normalize the name
    const normalizedName = normalizeName(user.name);
    
    // calculate the average score
    const avgScore = averageScore(user.scores);
    
    // Return { id, name, scoreCount, avg } 
    return {
        id: user.id,
        name: normalizedName,
        scoreCount: user.scores.length,
        avg: avgScore
    };
}

function summarizeUsers(userArray) {
  // 1. If not an array: throw an error
  if (!Array.isArray(userArray)) {
    throw new Error("userArray must be an array");
  }

  // 2. Return the mapped array
  return userArray.map(buildUserSummary);
}

function safeSummarizeUsers(users) {
    try {
        const result = summarizeUsers(users);

        return {
            ok: true,
            data: result
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }       
        }

function getUserDisplayNameById(usersArray, id) {
    // 1. If userArray not an array: throw an error
    if (!Array.isArray(usersArray)) {
        throw new Error("usersArray must be an array");
    }

    // 2. If id not number: throw an error
    if (typeof id !== "number") {
        throw new Error("id must be a number");
    }

    // 3. Find the user by id
    const found = usersArray.find(u => u.id === id);

    // 4. If user not found: throw an error
    if (!found) {
        throw new Error("User not found");
    }

    // 5. Return the user summary
    return normalizeName(found.name);
}

// Part C answers:

// 1) typeof undefined = Evaluates to the string "undefined".

// 2) typeof null = Evaluates to the string "object".

// 3) Why treat "" differently than null/undefined in normalizeName (conceptually)? null and undefined represent the absence of a value. "" (an empty string) is an actual, existing string value.

//Required test calls:

console.log(normalizeName(" Ada ")); //expected output: "Ada"
console.log(normalizeName("   ")); //expected output: "Unknown"
console.log(normalizeName(null)); //expected output: "Unknown"
console.log(averageScore([10, 20, 30])); //expected output: 20
console.log(averageScore([])); //expected output: null
console.log(buildUserSummary(users[0])); //expected output: { id: 101, name: "Ada", scoreCount: 3, avg: 20 }  
console.log(buildUserSummary(users[3])); //expected output: { id: 104, name: 'Unknown', scoreCount: 4, avg: 3 }
console.log(safeSummarizeUsers(users).ok) //expected output: true
console.log(getUserDisplayNameById(users, 105)); //expected output: "Grace"
console.log(safeSummarizeUsers("not an array")); //expected output: { ok: false, error: "userArray must be an array" }

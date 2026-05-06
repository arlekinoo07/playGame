export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  export function generateRoles(players, spies) {
    const roles = [];
  
    for (let i = 0; i < spies; i++) roles.push("spy");
    for (let i = spies; i < players; i++) roles.push("civil");
  
    return shuffle(roles);
  }
  
  export function getRandomTheme(category, THEMES) {
    const items = THEMES[category].items;
    return items[Math.floor(Math.random() * items.length)];
  }
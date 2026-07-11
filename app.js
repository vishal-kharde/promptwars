/**
 * PrepChef AI - Core Application Engine
 * Local Rule-Based AI Engine, Timeline Scheduler, Substitution Mapper, and Budgeting Advisor
 */

// --- RECIPE DATABASE CATALOG ---
const RECIPES = {
  breakfast: [
    {
      id: "b_avotoast",
      title: "Avocado & Egg Sourdough Toast",
      desc: "Toasted artisanal sourdough topped with crushed avocado, soft-boiled egg, and chili flakes.",
      kcal: 340,
      baseCost: 3.50,
      prepTime: 10,
      diets: ["none", "vegetarian"],
      category: "Breakfast",
      icon: "coffee",
      ingredients: [
        { name: "Sourdough Bread", qty: "1 slice", price: 0.80, replaceable: false, section: "Bakery" },
        { name: "Avocado", qty: "1/2 piece", price: 1.20, replaceable: true, section: "Produce", subKey: "avocado" },
        { name: "Egg", qty: "1 large", price: 0.50, replaceable: true, section: "Dairy & Eggs", subKey: "breakfast_protein" },
        { name: "Chili Flakes & Microgreens", qty: "1 pinch", price: 1.00, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "08:15 AM", task: "Boil the egg", desc: "Bring water to boil, cook egg for 6.5 mins, transfer to ice bath, and peel." },
        { time: "08:20 AM", task: "Toast & Mash", desc: "Toast sourdough. Mash avocado with a squeeze of lemon, salt, and pepper." },
        { time: "08:23 AM", task: "Assemble Toast", desc: "Spread avocado, slice the egg, and lay on top. Garnish with chili flakes." }
      ]
    },
    {
      id: "b_berryparfait",
      title: "Berry & Almond Greek Yogurt Parfait",
      desc: "Thick Greek yogurt layered with wild berries, honey, and sliced almonds.",
      kcal: 290,
      baseCost: 4.20,
      prepTime: 5,
      diets: ["none", "vegetarian", "glutenfree"],
      category: "Breakfast",
      icon: "coffee",
      ingredients: [
        { name: "Greek Yogurt", qty: "1 cup", price: 1.50, replaceable: true, section: "Dairy & Eggs", subKey: "yogurt" },
        { name: "Mixed Berries", qty: "1/2 cup", price: 1.80, replaceable: false, section: "Produce" },
        { name: "Almond Flakes & Honey", qty: "2 tbsp", price: 0.90, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "08:10 AM", task: "Layer Parfait", desc: "Spoon yogurt into a jar. Layer with washed fresh berries and sliced almonds." },
        { time: "08:14 AM", task: "Sweeten & Serve", desc: "Drizzle with high-quality honey or maple syrup." }
      ]
    },
    {
      id: "b_tofuscramble",
      title: "Turmeric Tofu Scramble",
      desc: "Crumbled firm tofu sauteed with baby spinach, turmeric, garlic powder, and nutritional yeast.",
      kcal: 280,
      baseCost: 3.10,
      prepTime: 12,
      diets: ["vegan", "vegetarian", "keto", "glutenfree"],
      category: "Breakfast",
      icon: "coffee",
      ingredients: [
        { name: "Firm Tofu", qty: "150g", price: 1.20, replaceable: false, section: "Proteins" },
        { name: "Baby Spinach", qty: "1 cup", price: 0.90, replaceable: false, section: "Produce" },
        { name: "Turmeric & Nutritional Yeast", qty: "1 tbsp", price: 1.00, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "08:10 AM", task: "Prep Tofu", desc: "Drain tofu and crumble with your hands or a fork." },
        { time: "08:15 AM", task: "Saute & Season", desc: "Cook tofu in a skillet with oil, turmeric, salt, and pepper for 5 minutes. Toss in spinach until wilted." }
      ]
    },
    {
      id: "b_ketobacon",
      title: "Keto Eggs & Avocado Skillet",
      desc: "Double sunny-side up eggs with crispy bacon slices and half an avocado.",
      kcal: 510,
      baseCost: 4.80,
      prepTime: 10,
      diets: ["keto", "glutenfree"],
      category: "Breakfast",
      icon: "coffee",
      ingredients: [
        { name: "Egg", qty: "2 large", price: 1.00, replaceable: false, section: "Dairy & Eggs" },
        { name: "Bacon", qty: "3 strips", price: 2.60, replaceable: true, section: "Proteins", subKey: "bacon" },
        { name: "Avocado", qty: "1/2 piece", price: 1.20, replaceable: false, section: "Produce" }
      ],
      steps: [
        { time: "08:10 AM", task: "Crisp Bacon", desc: "Fry bacon strips in a dry skillet over medium-high heat until golden brown." },
        { time: "08:15 AM", task: "Fry Eggs", desc: "Fry eggs in bacon fat to desired doneness. Season with salt and cracked pepper." },
        { time: "08:18 AM", task: "Plate & Serve", desc: "Serve alongside sliced fresh avocado." }
      ]
    }
  ],
  lunch: [
    {
      id: "l_quinoasalad",
      title: "Mediterranean Quinoa Salad",
      desc: "Chipped cucumber, cherry tomatoes, Kalamata olives, quinoa, and feta tossed in lemon-herb dressing.",
      kcal: 410,
      baseCost: 5.20,
      prepTime: 15,
      diets: ["none", "vegetarian", "glutenfree"],
      category: "Lunch",
      icon: "soup",
      ingredients: [
        { name: "Quinoa", qty: "1/2 cup", price: 0.90, replaceable: false, section: "Pantry Staples" },
        { name: "Cucumber & Tomatoes", qty: "1 cup", price: 1.50, replaceable: false, section: "Produce" },
        { name: "Feta Cheese", qty: "50g", price: 1.80, replaceable: true, section: "Dairy & Eggs", subKey: "feta" },
        { name: "Kalamata Olives", qty: "6 pieces", price: 1.00, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "12:15 PM", task: "Rinse & Boil Quinoa", desc: "Simmer quinoa in water (1:2 ratio) for 12 minutes until fluffy. Let cool slightly." },
        { time: "12:20 PM", task: "Chop Vegetables", desc: "Dice cucumber and halve cherry tomatoes. Toss in a large mixing bowl." },
        { time: "12:28 PM", task: "Toss Salad", desc: "Combine quinoa, vegetables, olives, crumbled feta, olive oil, and lemon juice." }
      ]
    },
    {
      id: "l_chickwrap",
      title: "Garlic Chicken Salad Wrap",
      desc: "Shredded roasted chicken breast, romaine lettuce, and garlic aioli rolled in a soft tortilla.",
      kcal: 480,
      baseCost: 6.00,
      prepTime: 10,
      diets: ["none"],
      category: "Lunch",
      icon: "soup",
      ingredients: [
        { name: "Shredded Chicken Breast", qty: "120g", price: 3.20, replaceable: true, section: "Proteins", subKey: "lunch_chicken" },
        { name: "Flour Tortilla", qty: "1 large", price: 0.60, replaceable: false, section: "Bakery" },
        { name: "Romaine Lettuce & Tomato", qty: "1 cup", price: 1.20, replaceable: false, section: "Produce" },
        { name: "Garlic Aioli Dressing", qty: "2 tbsp", price: 1.00, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "12:30 PM", task: "Prep Chicken Mix", desc: "Mix shredded chicken breast with garlic aioli, salt, and pepper in a bowl." },
        { time: "12:35 PM", task: "Wrap & Roll", desc: "Warm tortilla, line with romaine lettuce, tomatoes, and chicken mix. Fold and roll." }
      ]
    },
    {
      id: "l_vegantacos",
      title: "Spiced Black Bean Tacos",
      desc: "Corn tortillas stuffed with seasoned black beans, sweet corn salsa, and fresh cilantro lime cream.",
      kcal: 380,
      baseCost: 4.80,
      prepTime: 12,
      diets: ["vegan", "vegetarian", "glutenfree"],
      category: "Lunch",
      icon: "soup",
      ingredients: [
        { name: "Black Beans", qty: "1/2 can", price: 1.00, replaceable: false, section: "Pantry Staples" },
        { name: "Corn Tortillas", qty: "3 small", price: 0.80, replaceable: false, section: "Bakery" },
        { name: "Corn & Tomato Salsa", qty: "1/2 cup", price: 1.50, replaceable: false, section: "Produce" },
        { name: "Cashew Cilantro Cream", qty: "2 tbsp", price: 1.50, replaceable: true, section: "Pantry Staples", subKey: "cashew_cream" }
      ],
      steps: [
        { time: "12:30 PM", task: "Warm Beans", desc: "Heat black beans in a saucepan with cumin, chili powder, and 1 tbsp water for 5 minutes." },
        { time: "12:35 PM", task: "Toast Tortillas & Serve", desc: "Dry-toast tortillas in a pan. Spoon in beans, salsa, and drizzle with cream." }
      ]
    },
    {
      id: "l_ketosalad",
      title: "Avocado Chicken Cobb Salad",
      desc: "Romaine base with grilled chicken, sliced egg, bacon bits, avocado, and blue cheese dressing.",
      kcal: 590,
      baseCost: 7.20,
      prepTime: 15,
      diets: ["keto", "glutenfree"],
      category: "Lunch",
      icon: "soup",
      ingredients: [
        { name: "Grilled Chicken Breast", qty: "120g", price: 3.20, replaceable: false, section: "Proteins" },
        { name: "Avocado", qty: "1/2 piece", price: 1.20, replaceable: false, section: "Produce" },
        { name: "Bacon & Egg Bits", qty: "1/4 cup", price: 1.80, replaceable: false, section: "Proteins" },
        { name: "Blue Cheese Dressing", qty: "2 tbsp", price: 1.00, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "12:20 PM", task: "Chop salad base", desc: "Chop romaine lettuce and transfer to a large serving bowl." },
        { time: "12:25 PM", task: "Slice toppings", desc: "Slice grilled chicken, avocado, and hard-boiled egg." },
        { time: "12:32 PM", task: "Drizzle & Serve", desc: "Top salad with bacon bits, blue cheese, and chicken. Drizzle dressing." }
      ]
    }
  ],
  dinner: [
    {
      id: "d_salmon",
      title: "Pan-Seared Honey Garlic Salmon",
      desc: "Seared salmon fillet glazed with honey-garlic glaze, served over broccoli and brown rice.",
      kcal: 620,
      baseCost: 12.50,
      prepTime: 25,
      diets: ["none", "glutenfree"],
      category: "Dinner",
      icon: "cooking-pot",
      ingredients: [
        { name: "Salmon Fillet", qty: "150g", price: 8.50, replaceable: true, section: "Proteins", subKey: "dinner_protein" },
        { name: "Broccoli Florets", qty: "1.5 cups", price: 1.80, replaceable: false, section: "Produce" },
        { name: "Brown Rice", qty: "1/2 cup", price: 0.70, replaceable: false, section: "Pantry Staples" },
        { name: "Honey Garlic Marinade", qty: "3 tbsp", price: 1.50, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "06:30 PM", task: "Cook Rice", desc: "Bring water and brown rice to boil, simmer covered for 20 minutes." },
        { time: "06:35 PM", task: "Steam Broccoli", desc: "Wash and cut broccoli into florets. Steam over boiling water for 5 minutes." },
        { time: "06:42 PM", task: "Sear Salmon", desc: "Heat oil in skillet. Pan-sear salmon skin-side down for 4 mins, flip, cook 3 mins, glaze with sauce." }
      ]
    },
    {
      id: "d_tofutirfry",
      title: "Sesame Ginger Tofu Stir-Fry",
      desc: "Crispy cubed tofu sauteed with bell peppers, snap peas, and sesame ginger sauce over jasmine rice.",
      kcal: 540,
      baseCost: 6.80,
      prepTime: 20,
      diets: ["vegan", "vegetarian", "glutenfree"],
      category: "Dinner",
      icon: "cooking-pot",
      ingredients: [
        { name: "Extra Firm Tofu", qty: "200g", price: 1.80, replaceable: false, section: "Proteins" },
        { name: "Bell Peppers & Snap Peas", qty: "1.5 cups", price: 2.50, replaceable: false, section: "Produce" },
        { name: "Jasmine Rice", qty: "1/2 cup", price: 0.60, replaceable: false, section: "Pantry Staples" },
        { name: "Sesame Ginger Glaze", qty: "3 tbsp", price: 1.90, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "06:30 PM", task: "Cook Jasmine Rice", desc: "Simmer jasmine rice for 15 minutes, then steam with lid off." },
        { time: "06:35 PM", task: "Crisp Tofu cubes", desc: "Press tofu dry, cut into cubes. Pan-sear in a splash of oil until golden and crispy on all sides (8 mins)." },
        { time: "06:43 PM", task: "Stir-Fry Veggies", desc: "Toss bell peppers and snap peas into the pan, cook for 4 minutes, add sauce, and coat tofu." }
      ]
    },
    {
      id: "d_beefbroccoli",
      title: "Keto Beef & Broccoli",
      desc: "Thinly sliced flank steak stir-fried with broccoli florets in a savory ginger soy keto-friendly sauce.",
      kcal: 580,
      baseCost: 10.20,
      prepTime: 20,
      diets: ["keto", "glutenfree"],
      category: "Dinner",
      icon: "cooking-pot",
      ingredients: [
        { name: "Flank Steak Slices", qty: "150g", price: 6.80, replaceable: true, section: "Proteins", subKey: "dinner_beef" },
        { name: "Broccoli Florets", qty: "1.5 cups", price: 1.80, replaceable: false, section: "Produce" },
        { name: "Keto Soy Ginger Glaze", qty: "3 tbsp", price: 1.60, replaceable: false, section: "Pantry Staples" }
      ],
      steps: [
        { time: "06:40 PM", task: "Steam Broccoli", desc: "Steam broccoli florets until tender-crisp (approx 4 minutes)." },
        { time: "06:44 PM", task: "Flash-Fry Beef", desc: "In a smoking hot wok or skillet, fry flank steak slices for 3 minutes until cooked through." },
        { time: "06:48 PM", task: "Sauce & Combine", desc: "Add broccoli and keto sauce, toss rapidly for 1 minute before serving." }
      ]
    },
    {
      id: "d_curry",
      title: "Creamy Chickpea Coconut Curry",
      desc: "Simmered chickpeas, spinach, and sweet potatoes in a rich spiced coconut curry broth.",
      kcal: 490,
      baseCost: 5.80,
      prepTime: 25,
      diets: ["vegan", "vegetarian", "glutenfree"],
      category: "Dinner",
      icon: "cooking-pot",
      ingredients: [
        { name: "Canned Chickpeas", qty: "1/2 can", price: 1.00, replaceable: false, section: "Pantry Staples" },
        { name: "Sweet Potato Cubes", qty: "1 cup", price: 1.20, replaceable: false, section: "Produce" },
        { name: "Coconut Milk & Curry Paste", qty: "1/2 cup", price: 2.20, replaceable: false, section: "Pantry Staples" },
        { name: "Fresh Baby Spinach", qty: "1 cup", price: 1.40, replaceable: false, section: "Produce" }
      ],
      steps: [
        { time: "06:20 PM", task: "Boil Potatoes", desc: "Boil sweet potato cubes until tender (approx 10 minutes)." },
        { time: "06:30 PM", task: "Simmer Curry", desc: "Add curry paste, coconut milk, boiled potatoes, and chickpeas to a pot. Simmer for 10 minutes." },
        { time: "06:42 PM", task: "Wilt Spinach", desc: "Stir in spinach during the last 2 minutes until fully wilted." }
      ]
    }
  ]
};

// --- INGREDIENT SUBSTITUTION MAP ---
const SUBSTITUTIONS = {
  dinner_protein: {
    label: "Salmon Fillet Replacement",
    mealId: "d_salmon",
    options: [
      { name: "Salmon Fillet", price: 8.50, desc: "Premium wild-caught salmon (rich in Omega-3)", diffText: "Original price", diffPrice: 0 },
      { name: "Organic Firm Tofu", price: 1.80, desc: "Economical plant-based soy block", diffText: "Saves $6.70", diffPrice: -6.70 },
      { name: "Cod Fillet", price: 4.80, desc: "Flaky mild white fish option", diffText: "Saves $3.70", diffPrice: -3.70 }
    ],
    activeIdx: 0
  },
  breakfast_protein: {
    label: "Egg Replacement",
    mealId: "b_avotoast",
    options: [
      { name: "Egg", price: 0.50, desc: "Standard farm fresh egg", diffText: "Original price", diffPrice: 0 },
      { name: "Smoked Tempeh Slices", price: 1.60, desc: "Crispy vegetarian replacement", diffText: "Adds $1.10", diffPrice: 1.10 }
    ],
    activeIdx: 0
  },
  yogurt: {
    label: "Yogurt Replacement",
    mealId: "b_berryparfait",
    options: [
      { name: "Greek Yogurt", price: 1.50, desc: "Dairy-based thick yogurt", diffText: "Original price", diffPrice: 0 },
      { name: "Coconut Milk Yogurt", price: 2.20, desc: "Plant-based dairy-free substitute", diffText: "Adds $0.70", diffPrice: 0.70 }
    ],
    activeIdx: 0
  },
  feta: {
    label: "Feta Replacement",
    mealId: "l_quinoasalad",
    options: [
      { name: "Feta Cheese", price: 1.80, desc: "Tangy sheep milk cheese", diffText: "Original price", diffPrice: 0 },
      { name: "Violife Vegan Feta", price: 2.60, desc: "Premium coconut-oil vegan feta", diffText: "Adds $0.80", diffPrice: 0.80 },
      { name: "Pumpkin Seeds", price: 1.00, desc: "Nutty allergen-free option", diffText: "Saves $0.80", diffPrice: -0.80 }
    ],
    activeIdx: 0
  },
  lunch_chicken: {
    label: "Chicken Wrap Protein",
    mealId: "l_chickwrap",
    options: [
      { name: "Shredded Chicken Breast", price: 3.20, desc: "Oven-roasted chicken", diffText: "Original price", diffPrice: 0 },
      { name: "Chickpea Smash", price: 1.00, desc: "Mashed garlic chickpeas", diffText: "Saves $2.20", diffPrice: -2.20 }
    ],
    activeIdx: 0
  },
  dinner_beef: {
    label: "Beef & Broccoli Protein",
    mealId: "d_beefbroccoli",
    options: [
      { name: "Flank Steak Slices", price: 6.80, desc: "Premium thin cut beef", diffText: "Original price", diffPrice: 0 },
      { name: "Sauteed Portobello", price: 2.50, desc: "Savory veggie mushroom slices", diffText: "Saves $4.30", diffPrice: -4.30 }
    ],
    activeIdx: 0
  }
};

// --- DEFAULT PANTRY STOCK CHECKLIST ---
const PANTRY_ITEMS = [
  { name: "Salt & Pepper", checked: true },
  { name: "Olive Oil", checked: true },
  { name: "Lemon Juice", checked: false },
  { name: "Garlic Powder", checked: false },
  { name: "Honey", checked: false },
  { name: "Sourdough Bread", checked: false },
  { name: "Brown Rice", checked: false }
];

// --- APP STATE ---
let state = {
  pace: "moderate", // moderate, busy, relaxed
  prepWindows: {
    morning: true,
    afternoon: true,
    evening: true
  },
  diet: "none",
  budgetTarget: 25,
  pantryStock: JSON.parse(JSON.stringify(PANTRY_ITEMS)),
  selectedMeals: {
    breakfast: null,
    lunch: null,
    dinner: null
  },
  activeSubs: JSON.parse(JSON.stringify(SUBSTITUTIONS)),
  todoChecked: {},
  groceryChecked: {}
};

// Chef Quotes / Loading States
const CHEF_STATUS_TEXTS = [
  "Analyzing schedule time blocks...",
  "Querying fresh protein markets...",
  "Calculating macro distributions...",
  "Drafting kitchen prep paths...",
  "Checking pantry optimization rates...",
  "Creating budget curves..."
];

const CHEF_TIPS = [
  "Pre-chopping vegetables during your morning prep window saves up to 15 minutes of evening rush!",
  "Make double-batches of quinoa or brown rice to use across both lunch and dinner slots.",
  "Store fresh herbs wrapped in a damp paper towel inside a reusable bag to keep them fresh for 2 weeks.",
  "To lower dinner costs, consider switching salmon or beef out for high-protein tofu alternatives."
];

// --- DOM ELEMENTS ---
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupEventListeners();
  renderPantryStock();
  updateBudgetSliderLabel();
}

function setupEventListeners() {
  // Tabs Navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`tab-${tabId}`).classList.add("active");
    });
  });

  // Schedule Preset Toggle
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.pace = btn.getAttribute("data-pace");
    });
  });

  // Prep windows checkbox state
  document.getElementById("prep-morning").addEventListener("change", (e) => { state.prepWindows.morning = e.target.checked; });
  document.getElementById("prep-afternoon").addEventListener("change", (e) => { state.prepWindows.afternoon = e.target.checked; });
  document.getElementById("prep-evening").addEventListener("change", (e) => { state.prepWindows.evening = e.target.checked; });

  // Diet select state
  document.getElementById("diet-preference").addEventListener("change", (e) => {
    state.diet = e.target.value;
  });

  // Budget slider state
  const slider = document.getElementById("budget-limit");
  slider.addEventListener("input", () => {
    state.budgetTarget = parseFloat(slider.value);
    updateBudgetSliderLabel();
  });

  // Add custom pantry item button
  document.getElementById("add-pantry-btn").addEventListener("click", () => {
    addCustomPantryItem();
  });
  document.getElementById("custom-pantry-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addCustomPantryItem();
    }
  });

  // Generate Plan button
  document.getElementById("generate-plan-btn").addEventListener("click", () => {
    triggerAIGeneration();
  });

  // Reset Plan button
  document.getElementById("reset-plan-btn").addEventListener("click", () => {
    resetToWelcome();
  });

  // Reset Groceries Checklist
  document.getElementById("uncheck-all-groceries").addEventListener("click", () => {
    state.groceryChecked = {};
    renderGroceryAndBudget();
  });
}

function updateBudgetSliderLabel() {
  document.getElementById("budget-value").textContent = state.budgetTarget;
  const label = document.getElementById("budget-level");
  if (state.budgetTarget <= 15) {
    label.textContent = "Thrifty ($)";
  } else if (state.budgetTarget <= 35) {
    label.textContent = "Standard ($$)";
  } else {
    label.textContent = "Gourmet ($$$)";
  }
}

// --- PANTRY STOCK MANAGER ---
function renderPantryStock() {
  const container = document.getElementById("pantry-chips-container");
  container.innerHTML = "";
  
  state.pantryStock.forEach((item, index) => {
    const chip = document.createElement("div");
    chip.className = `pantry-chip ${item.checked ? 'active' : ''}`;
    chip.innerHTML = `
      <span>${item.name}</span>
      <i data-lucide="${item.checked ? 'check' : 'plus'}" style="width: 12px; height: 12px;"></i>
    `;
    
    chip.addEventListener("click", () => {
      item.checked = !item.checked;
      renderPantryStock();
      // If we are currently active, update groceries list real-time
      if (!document.getElementById("view-dashboard").classList.contains("hidden")) {
        renderGroceryAndBudget();
      }
    });
    container.appendChild(chip);
  });
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function addCustomPantryItem() {
  const input = document.getElementById("custom-pantry-input");
  const value = input.value.trim();
  if (value) {
    state.pantryStock.push({ name: value, checked: true });
    input.value = "";
    renderPantryStock();
    if (!document.getElementById("view-dashboard").classList.contains("hidden")) {
      renderGroceryAndBudget();
    }
  }
}

// --- AI LOADER SIMULATOR ---
function triggerAIGeneration() {
  // Hide panels and show loader
  document.getElementById("view-welcome").classList.add("hidden");
  document.getElementById("view-dashboard").classList.add("hidden");
  document.getElementById("view-loader").classList.remove("hidden");
  
  // Choose random chef tip
  const randTip = CHEF_TIPS[Math.floor(Math.random() * CHEF_TIPS.length)];
  document.getElementById("chef-tip-text").textContent = `"${randTip}"`;
  
  let step = 0;
  const statusEl = document.getElementById("loader-status-text");
  
  const statusInterval = setInterval(() => {
    if (step < CHEF_STATUS_TEXTS.length) {
      statusEl.textContent = CHEF_STATUS_TEXTS[step];
      step++;
    }
  }, 350);

  setTimeout(() => {
    clearInterval(statusInterval);
    generatePlanData();
    // Transition to dashboard view
    document.getElementById("view-loader").classList.add("hidden");
    document.getElementById("view-dashboard").classList.remove("hidden");
  }, 2200);
}

function resetToWelcome() {
  document.getElementById("view-dashboard").classList.add("hidden");
  document.getElementById("view-loader").classList.add("hidden");
  document.getElementById("view-welcome").classList.remove("hidden");
}

// --- AI CORE CALCULATION ENGINE ---
function generatePlanData() {
  // 1. Select Breakfast, Lunch, Dinner based on diet preference and schedule busy factor
  state.selectedMeals.breakfast = matchRecipe("breakfast", state.diet, state.pace);
  state.selectedMeals.lunch = matchRecipe("lunch", state.diet, state.pace);
  state.selectedMeals.dinner = matchRecipe("dinner", state.diet, state.pace);

  // Reset checklists
  state.todoChecked = {};
  state.groceryChecked = {};

  // Reset Active substitutions back to defaults
  state.activeSubs = JSON.parse(JSON.stringify(SUBSTITUTIONS));

  // Render dashboard tabs content
  renderMealPlanCards();
  renderTimelineTodo();
  renderGroceryAndBudget();
  renderSubstitutions();
}

function matchRecipe(mealType, diet, pace) {
  let list = RECIPES[mealType];
  
  // Filter by diet
  if (diet !== "none") {
    list = list.filter(r => r.diets.includes(diet));
  }
  
  // Filter by pace/busy restriction
  if (pace === "busy") {
    // Only select recipes with lower prep times
    let busyFiltered = list.filter(r => r.prepTime <= 15);
    if (busyFiltered.length > 0) list = busyFiltered;
  } else if (pace === "relaxed") {
    // Prefer higher prep time or premium
    let gourmetFiltered = list.filter(r => r.prepTime >= 15);
    if (gourmetFiltered.length > 0) list = gourmetFiltered;
  }
  
  // Fallback to random match in list if none, or the first item
  if (list.length === 0) {
    list = RECIPES[mealType]; // Fallback to all breakfast/lunch/dinner
  }
  
  return JSON.parse(JSON.stringify(list[Math.floor(Math.random() * list.length)]));
}

// --- RENDERING MODULES ---

// 1. Meal Plan tab render
function renderMealPlanCards() {
  const container = document.getElementById("meal-cards-grid");
  container.innerHTML = "";

  const dietLabels = {
    none: "Flexitarian Diet",
    vegetarian: "Vegetarian Plan",
    vegan: "Vegan Plan",
    keto: "Keto Plan",
    glutenfree: "Gluten-Free Plan"
  };
  document.getElementById("diet-tag").textContent = dietLabels[state.diet] || "Custom Plan";

  const meals = [
    { type: "Breakfast", key: "breakfast", icon: "coffee", class: "coffee" },
    { type: "Lunch", key: "lunch", icon: "soup", class: "soup" },
    { type: "Dinner", key: "dinner", icon: "cooking-pot", class: "cooking-pot" }
  ];

  meals.forEach(m => {
    const meal = state.selectedMeals[m.key];
    if (!meal) return;

    // Check if ingredient has active substitutions to update titles or descriptors
    let customizedTitle = meal.title;
    let customizedDesc = meal.desc;
    
    // Scan if any ingredients of this meal are substituted
    meal.ingredients.forEach(ing => {
      if (ing.subKey && state.activeSubs[ing.subKey]) {
        const sub = state.activeSubs[ing.subKey];
        const activeOpt = sub.options[sub.activeIdx];
        if (sub.activeIdx > 0) {
          // If substitute is selected, reflect in title or subtitle optionally
          customizedTitle = meal.title.replace("Salmon", activeOpt.name).replace("Egg", activeOpt.name).replace("Chicken", activeOpt.name).replace("Beef", activeOpt.name);
        }
      }
    });

    const card = document.createElement("div");
    card.className = "meal-card";
    card.innerHTML = `
      <div class="meal-time-tag">${m.type}</div>
      <div class="meal-image-container">
        <div class="meal-icon-placeholder"><i data-lucide="${m.icon}"></i></div>
      </div>
      <div class="meal-card-content">
        <h3 class="meal-title">${customizedTitle}</h3>
        <p class="meal-desc">${customizedDesc}</p>
        <div class="meal-meta">
          <span class="meta-item"><i data-lucide="clock"></i> ${meal.prepTime} min</span>
          <span class="meta-item"><i data-lucide="flame"></i> ${meal.kcal} kcal</span>
          <span class="meta-item cost-badge"><i data-lucide="dollar-sign"></i> ${meal.baseCost.toFixed(2)} est.</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 2. Timeline To-Do rendering
function renderTimelineTodo() {
  const container = document.getElementById("todo-timeline");
  container.innerHTML = "";

  // Aggregate cooking steps from breakfast, lunch, dinner
  const timelineGroups = [
    { label: "Morning Prep Session", key: "morning", icon: "coffee", items: [] },
    { label: "Mid-day Cooking Session", key: "afternoon", icon: "soup", items: [] },
    { label: "Evening Plating & Cooking", key: "evening", icon: "cooking-pot", items: [] }
  ];

  // Map meals steps to morning/afternoon/evening prep sessions
  if (state.selectedMeals.breakfast) {
    state.selectedMeals.breakfast.steps.forEach((s, idx) => {
      timelineGroups[0].items.push({
        id: `t_b_${idx}`,
        time: s.time,
        task: s.task,
        desc: s.desc,
        meal: "Breakfast"
      });
    });
  }

  if (state.selectedMeals.lunch) {
    state.selectedMeals.lunch.steps.forEach((s, idx) => {
      timelineGroups[1].items.push({
        id: `t_l_${idx}`,
        time: s.time,
        task: s.task,
        desc: s.desc,
        meal: "Lunch"
      });
    });
  }

  if (state.selectedMeals.dinner) {
    state.selectedMeals.dinner.steps.forEach((s, idx) => {
      timelineGroups[2].items.push({
        id: `t_d_${idx}`,
        time: s.time,
        task: s.task,
        desc: s.desc,
        meal: "Dinner"
      });
    });
  }

  // Filter groups out based on user schedule checkboxes
  let totalTasks = 0;
  let completedTasks = 0;

  timelineGroups.forEach(group => {
    // If prep window is disabled, grey out or adapt
    const isWindowEnabled = state.prepWindows[group.key];
    if (group.items.length === 0) return;

    const section = document.createElement("div");
    section.className = "timeline-section";
    if (!isWindowEnabled) {
      section.style.opacity = "0.45";
    }

    let titleAppend = !isWindowEnabled ? " (Window Closed in Config)" : "";

    let sectionHTML = `
      <div class="timeline-header-node">
        <i data-lucide="${group.icon}"></i>
      </div>
      <h3 class="timeline-section-title">${group.label}<span>${titleAppend}</span></h3>
      <div class="timeline-tasks">
    `;

    group.items.forEach(task => {
      totalTasks++;
      const isCompleted = state.todoChecked[task.id] || false;
      if (isCompleted) completedTasks++;

      // Adjust text if substituted
      let modifiedTask = task.task;
      let modifiedDesc = task.desc;
      
      const bMeal = state.selectedMeals.breakfast;
      const lMeal = state.selectedMeals.lunch;
      const dMeal = state.selectedMeals.dinner;
      
      // Look up and apply substitutions visually in instructions
      if (task.meal === "Breakfast" && bMeal) {
        bMeal.ingredients.forEach(ing => {
          if (ing.subKey && state.activeSubs[ing.subKey] && state.activeSubs[ing.subKey].activeIdx > 0) {
            const activeSub = state.activeSubs[ing.subKey].options[state.activeSubs[ing.subKey].activeIdx];
            modifiedTask = modifiedTask.replace("egg", activeSub.name).replace("Egg", activeSub.name);
            modifiedDesc = modifiedDesc.replace("egg", activeSub.name).replace("Egg", activeSub.name);
          }
        });
      } else if (task.meal === "Lunch" && lMeal) {
        lMeal.ingredients.forEach(ing => {
          if (ing.subKey && state.activeSubs[ing.subKey] && state.activeSubs[ing.subKey].activeIdx > 0) {
            const activeSub = state.activeSubs[ing.subKey].options[state.activeSubs[ing.subKey].activeIdx];
            modifiedTask = modifiedTask.replace("chicken", activeSub.name).replace("Chicken", activeSub.name).replace("feta", activeSub.name).replace("Feta", activeSub.name);
            modifiedDesc = modifiedDesc.replace("chicken", activeSub.name).replace("Chicken", activeSub.name).replace("feta", activeSub.name).replace("Feta", activeSub.name);
          }
        });
      } else if (task.meal === "Dinner" && dMeal) {
        dMeal.ingredients.forEach(ing => {
          if (ing.subKey && state.activeSubs[ing.subKey] && state.activeSubs[ing.subKey].activeIdx > 0) {
            const activeSub = state.activeSubs[ing.subKey].options[state.activeSubs[ing.subKey].activeIdx];
            modifiedTask = modifiedTask.replace("salmon", activeSub.name).replace("Salmon", activeSub.name).replace("steak", activeSub.name).replace("Steak", activeSub.name);
            modifiedDesc = modifiedDesc.replace("salmon", activeSub.name).replace("Salmon", activeSub.name).replace("steak", activeSub.name).replace("Steak", activeSub.name);
          }
        });
      }

      sectionHTML += `
        <div class="todo-task-item ${isCompleted ? 'completed' : ''}" data-id="${task.id}">
          <div class="checkmark"></div>
          <span class="task-time-box">${task.time}</span>
          <div class="task-content-details">
            <h4 class="task-text">${modifiedTask}</h4>
            <p class="task-instructions">${modifiedDesc}</p>
          </div>
        </div>
      `;
    });

    sectionHTML += `</div>`;
    section.innerHTML = sectionHTML;
    
    // Attach checklist click events
    section.querySelectorAll(".todo-task-item").forEach(item => {
      item.addEventListener("click", () => {
        const taskId = item.getAttribute("data-id");
        state.todoChecked[taskId] = !state.todoChecked[taskId];
        renderTimelineTodo();
      });
    });

    container.appendChild(section);
  });

  // Update progress bar
  document.getElementById("todo-completed-count").textContent = completedTasks;
  document.getElementById("todo-total-count").textContent = totalTasks;
  const progressPct = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  document.getElementById("todo-progress-bar").style.width = `${progressPct}%`;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 3. Grocery and Budget rendering
function renderGroceryAndBudget() {
  const container = document.getElementById("grocery-list-container");
  container.innerHTML = "";

  // Compile active ingredients list from chosen recipes
  const items = [];
  const meals = ["breakfast", "lunch", "dinner"];
  
  let rawBreakfastCost = 0;
  let rawLunchCost = 0;
  let rawDinnerCost = 0;
  let totalPantryDiscount = 0;

  meals.forEach(mKey => {
    const meal = state.selectedMeals[mKey];
    if (!meal) return;

    meal.ingredients.forEach(ing => {
      // Check substitution option
      let activeItemName = ing.name;
      let activeItemPrice = ing.price;

      if (ing.subKey && state.activeSubs[ing.subKey]) {
        const sub = state.activeSubs[ing.subKey];
        const opt = sub.options[sub.activeIdx];
        activeItemName = opt.name;
        activeItemPrice = opt.price;
      }

      // Check if user has item checked in pantry stock list
      const hasInPantry = state.pantryStock.some(p => p.checked && p.name.toLowerCase() === activeItemName.toLowerCase());

      const itemCost = hasInPantry ? 0 : activeItemPrice;
      if (hasInPantry) {
        totalPantryDiscount += activeItemPrice;
      }

      if (mKey === "breakfast") rawBreakfastCost += activeItemPrice;
      if (mKey === "lunch") rawLunchCost += activeItemPrice;
      if (mKey === "dinner") rawDinnerCost += activeItemPrice;

      items.push({
        name: activeItemName,
        price: activeItemPrice,
        section: ing.section,
        hasInPantry: hasInPantry
      });
    });
  });

  // Group by grocery store section
  const sections = {};
  items.forEach(it => {
    if (!sections[it.section]) {
      sections[it.section] = [];
    }
    sections[it.section].push(it);
  });

  // Render lists grouped by section
  let groceryIdCounter = 0;
  let actualGroceryTotalCost = 0;

  Object.keys(sections).forEach(secName => {
    const secContainer = document.createElement("div");
    secContainer.className = "grocery-section";
    
    let secHTML = `
      <h4 class="grocery-section-title">${secName}</h4>
      <div class="grocery-items-list">
    `;

    sections[secName].forEach(it => {
      groceryIdCounter++;
      const uniqueId = `g_item_${groceryIdCounter}`;
      const isChecked = state.groceryChecked[it.name] || false;
      
      if (!it.hasInPantry) {
        actualGroceryTotalCost += it.price;
      }

      secHTML += `
        <div class="grocery-item ${isChecked ? 'checked' : ''}" data-name="${it.name}">
          <div class="checkmark"></div>
          <span class="item-name">${it.name} ${it.hasInPantry ? '<strong>(Pantry Stock)</strong>' : ''}</span>
          <span class="item-price">${it.hasInPantry ? '$0.00' : '$' + it.price.toFixed(2)}</span>
        </div>
      `;
    });

    secHTML += `</div>`;
    secContainer.innerHTML = secHTML;

    secContainer.querySelectorAll(".grocery-item").forEach(item => {
      item.addEventListener("click", () => {
        const iName = item.getAttribute("data-name");
        state.groceryChecked[iName] = !state.groceryChecked[iName];
        renderGroceryAndBudget();
      });
    });

    container.appendChild(secContainer);
  });

  // Render Budget Analytics side panel
  document.getElementById("total-grocery-cost").textContent = `$${actualGroceryTotalCost.toFixed(2)}`;
  document.getElementById("target-grocery-budget").textContent = `$${state.budgetTarget.toFixed(2)}`;
  
  // Cost breakdown
  document.getElementById("cost-breakdown-breakfast").textContent = `$${rawBreakfastCost.toFixed(2)}`;
  document.getElementById("cost-breakdown-lunch").textContent = `$${rawLunchCost.toFixed(2)}`;
  document.getElementById("cost-breakdown-dinner").textContent = `$${rawDinnerCost.toFixed(2)}`;
  document.getElementById("cost-breakdown-pantry").textContent = `-$${totalPantryDiscount.toFixed(2)}`;

  // Budget status alert logic
  const alertEl = document.getElementById("budget-status-alert");
  const alertTitle = document.getElementById("budget-alert-title");
  const alertDesc = document.getElementById("budget-alert-desc");
  const adviceText = document.getElementById("budget-advice-text");

  alertEl.className = "budget-status-alert"; // Reset
  
  if (actualGroceryTotalCost <= state.budgetTarget) {
    alertEl.classList.add("within-budget");
    alertTitle.innerHTML = `<i data-lucide="check-circle-2" style="display:inline-block; vertical-align:middle; width:16px; margin-right:4px;"></i> Feasible!`;
    alertDesc.textContent = `Your meal selection fits comfortably below your target budget. Ready to shop!`;
  } else {
    alertEl.classList.add("over-budget");
    alertTitle.innerHTML = `<i data-lucide="alert-triangle" style="display:inline-block; vertical-align:middle; width:16px; margin-right:4px;"></i> Over Budget Warning`;
    alertDesc.textContent = `Estimated grocery cost is $${(actualGroceryTotalCost - state.budgetTarget).toFixed(2)} above your target limit.`;
  }

  // Smart advice recommendations based on database & substitutions
  let adviceMessage = "Great choice! Utilize your checked pantry stock items to keep active cash costs extremely low.";
  
  // Find potential protein substitution to save money
  const salmonSub = state.activeSubs.dinner_protein;
  const beefSub = state.activeSubs.dinner_beef;
  
  if (actualGroceryTotalCost > state.budgetTarget) {
    if (salmonSub && salmonSub.activeIdx === 0 && state.selectedMeals.dinner && state.selectedMeals.dinner.id === "d_salmon") {
      adviceMessage = "Budget Saver Tip: Go to the Substitutions tab and swap the Salmon Fillet for Organic Firm Tofu to save $6.70 instantly.";
    } else if (beefSub && beefSub.activeIdx === 0 && state.selectedMeals.dinner && state.selectedMeals.dinner.id === "d_beefbroccoli") {
      adviceMessage = "Budget Saver Tip: Go to the Substitutions tab and swap the Flank Steak for Sauteed Portobello mushrooms to save $4.30 instantly.";
    } else {
      adviceMessage = "Try marking items like Sourdough bread, rice, or condiments as owned in the sidebar to remove them from your shopping list.";
    }
  }
  adviceText.textContent = adviceMessage;

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 4. Substitutions rendering
function renderSubstitutions() {
  const container = document.getElementById("subs-cards-container");
  container.innerHTML = "";

  // Look through substitutions that belong to our selected meals
  const activeSubsKeys = Object.keys(state.activeSubs).filter(subKey => {
    const sub = state.activeSubs[subKey];
    return state.selectedMeals.breakfast?.id === sub.mealId ||
           state.selectedMeals.lunch?.id === sub.mealId ||
           state.selectedMeals.dinner?.id === sub.mealId;
  });

  if (activeSubsKeys.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 0; grid-column: 1 / -1;">
        <i data-lucide="info" style="width: 32px; height: 32px; opacity: 0.5; margin-bottom: 8px;"></i>
        <p>No customizable ingredient swaps available for your current meal configuration.</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  activeSubsKeys.forEach(subKey => {
    const sub = state.activeSubs[subKey];
    const card = document.createElement("div");
    card.className = "sub-card";
    
    // Find meal category/time label
    let mealLabel = "Meal Item";
    if (state.selectedMeals.breakfast?.id === sub.mealId) mealLabel = "Breakfast";
    else if (state.selectedMeals.lunch?.id === sub.mealId) mealLabel = "Lunch";
    else if (state.selectedMeals.dinner?.id === sub.mealId) mealLabel = "Dinner";

    let cardHTML = `
      <div class="sub-card-header">
        <h3>${sub.label}</h3>
        <span class="meal-source-tag">${mealLabel}</span>
      </div>
      <div class="sub-options-container">
    `;

    sub.options.forEach((opt, oIdx) => {
      const isActive = sub.activeIdx === oIdx;
      
      let badgeClass = "price-equal";
      let priceText = "No diff";
      
      if (opt.diffPrice < 0) {
        badgeClass = "price-down";
        priceText = `-$${Math.abs(opt.diffPrice).toFixed(2)}`;
      } else if (opt.diffPrice > 0) {
        badgeClass = "price-up";
        priceText = `+$${Math.abs(opt.diffPrice).toFixed(2)}`;
      }

      cardHTML += `
        <div class="sub-option-row ${isActive ? 'active' : ''}" data-subkey="${subKey}" data-idx="${oIdx}">
          <div class="radio-circle"></div>
          <div class="option-details">
            <span class="option-name">${opt.name}</span>
            <span class="option-desc">${opt.desc}</span>
          </div>
          <span class="option-price-diff ${badgeClass}">${priceText}</span>
        </div>
      `;
    });

    cardHTML += `</div>`;
    card.innerHTML = cardHTML;

    // Click events to change active substitution indices
    card.querySelectorAll(".sub-option-row").forEach(row => {
      row.addEventListener("click", () => {
        const key = row.getAttribute("data-subkey");
        const idx = parseInt(row.getAttribute("data-idx"));
        
        state.activeSubs[key].activeIdx = idx;
        
        // Re-render
        renderMealPlanCards();
        renderTimelineTodo();
        renderGroceryAndBudget();
        renderSubstitutions();
      });
    });

    container.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

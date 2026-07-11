# PrepChef AI - Custom Cooking Planner & To-Do List

PrepChef AI is a static web application that serves as an intelligent culinary task planner and budget manager. It helps users organize their cooking schedule, manage recipes, adapt to dietary constraints, optimize grocery costs using current pantry stock, and swap ingredients dynamically.

---

## 1. Chosen Vertical
**Smart Home / Culinary Productivity**
PrepChef AI sits at the intersection of home automation, kitchen productivity, and meal planning. It solves the everyday dilemma of deciding what to cook based on:
- **Available Time & Pace**: Adapting preparation schedules based on how busy the user's day is.
- **Dietary Lifestyles**: Catering to modern diet choices (Vegetarian, Vegan, Keto, Gluten-Free).
- **Financial Feasibility**: Helping users stay within budget via real-time shopping calculations and discount checking.

---

## 2. Approach and Logic
The application uses a responsive, local, rule-based simulation engine instead of a resource-heavy server or external API. The core components are:

*   **Pacing & Prep Window Adaptation**: 
    The scheduler partitions meal steps into three logical blocks: *Morning Prep Session*, *Mid-day Cooking Session*, and *Evening Plating & Cooking*. Based on active checkboxes for available prep windows (morning, afternoon, evening), tasks are visualised. Pacing filters the recipe database (`RECIPES`) by expected preparation time.
*   **Pantry Ingredient Discounts**: 
    When calculating the grocery checklist, the engine matches ingredients against active pantry chips. If an item is in the pantry, its cost is deducted from the grocery total, displaying a "Pantry Ingredient Discount" in the budget summary.
*   **Flexible Recipe Substitution (State Swapping)**: 
    The app uses a modular substitution map (`SUBSTITUTIONS`) for high-impact protein or dairy items. Swapping an ingredient triggers state updates across multiple views:
    1.  Rewrites instructions in the timeline dynamically (e.g., "Pan-sear salmon skin-side down..." becomes "Pan-sear organic firm tofu...").
    2.  Updates the title and tags of the active recipe cards.
    3.  Recalculates the estimated grocery cost and updates the budget analysis dashboard.
*   **Dynamic Checklist State**: 
    To-do task states and grocery list checkboxes are preserved in the application's memory state, enabling progress bars to calculate completion rates in real-time.

---

## 3. How the Solution Works
1.  **Sidebar Settings Configuration**: The user inputs constraints including:
    -   *Schedule pace* (Moderate, Packed, Relaxed).
    -   *Available prep windows* (Morning, Afternoon, Evening).
    -   *Dietary preference* (Flexitarian, Vegetarian, Vegan, Keto, Gluten-Free).
    -   *Budget limit* (ranging from $10 to $60).
    -   *Pantry inventory list* (where custom items can be typed and checked).
2.  **Plan Generation Simulation**:
    When the user clicks **Generate AI Cooking Plan**, the dashboard goes into a loading phase with a spinner. During this period, live random chef tips (e.g., storage tips, bulk-prep advice) are displayed.
3.  **Dynamic Rendering**:
    -   **Meal Plan**: Selects breakfast, lunch, and dinner from the catalog matching the constraints.
    -   **Cooking To-Do List**: Shows a timeline of prep tasks scheduled for the active prep windows, with interactive checkbox lists.
    -   **Groceries & Budget**: Groups raw ingredients into food category checklists. The dashboard renders target budget bars, current cost projections, and alerts the user if they are within or exceeding constraints.
    -   **Substitutions**: Lists items eligible for swap. Selecting an alternative immediately updates the price, recipe instructions, and titles.

---

## 4. Assumptions Made
1.  **Local Rule-Based Catalog**: To avoid API latency, costs, and key requirements, the recipe database is simulated locally using a rule-based selector.
2.  **Static Pricing**: Estimated costs are based on standard average grocery pricing presets.
3.  **Meal Blocks**: Time blocks are assumed to be morning (breakfast prep), afternoon (lunch prep), and evening (dinner prep).

---

## 5. Steps to Run and Access the Webapp

The web application is fully static, written in standard HTML5, Vanilla CSS, and JavaScript. No build step or installation is required.

### Option A: Direct Local Access
1. Navigate to the project root directory.
2. Double-click [index.html](file:///d:/PromptWars/index.html) or right-click it and choose to open with your web browser (Chrome, Firefox, Edge, Safari, etc.).

### Option B: Local Web Server (Recommended)
Running through a local web server ensures standard resource-loading protocols. You can run one of the following commands from the root directory:

**Using Python**:
```powershell
python -m http.server 8000
```
Then, open [http://localhost:8000](http://localhost:8000) in your web browser.

**Using Node.js (`npx`)**:
```powershell
npx serve
```
Then, open the URL specified in your terminal output (typically [http://localhost:3000](http://localhost:3000) or [http://localhost:5000](http://localhost:5000)).
module.exports = [
"[project]/src/app/Home/Program/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgramPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DAYS = [
    {
        label: "DAY 1",
        dateLabel: "MONDAY, FEB 23, 2026",
        meals: [
            {
                type: "Breakfast",
                name: "CHICKPEA FLOUR OMELETTE WITH SPINACH ,TOMATO & SAU",
                calories: 318,
                protein: 10.8,
                carbs: 33.2,
                fat: 15.5,
                description: "Chickpea flour omelette with spinach, cherry tomatoes, earthy oyster mushrooms, and turmeric, finished with tangy sauerkraut and fresh avocado"
            },
            {
                type: "Lunch",
                name: "CHICKEN CHIPOTILE BOWL",
                calories: 420,
                protein: 35.9,
                carbs: 46.1,
                fat: 10.4,
                description: "Chipotle chicken bowl with brown basmati rice, black beans, sweet corn, sautéed peppers, creamy avocado, and a cooling yogurt sauce"
            },
            {
                type: "Dinner",
                name: "KOREAN BBQ TACO",
                calories: 393,
                protein: 26,
                carbs: 30.7,
                fat: 17.1,
                description: "Korean BBQ beef tacos with sesame-glazed brisket, crisp vegetables, fresh spring onions, and a bright lime finish"
            },
            {
                type: "Snack",
                name: "LEMON CAKE",
                calories: 216,
                protein: 1.4,
                carbs: 32.5,
                fat: 9,
                description: "Powered by Honestry"
            }
        ]
    },
    {
        label: "DAY 2",
        dateLabel: "TUESDAY, FEB 24, 2026",
        meals: [
            {
                type: "Breakfast",
                name: "CHOCOLATE PB PROTEIN OATS",
                calories: 419,
                protein: 26.6,
                carbs: 41.4,
                fat: 15.4,
                description: "Peanut butter cup overnight oats with creamy yogurt, dark chocolate, chia seeds, and a touch of maple"
            },
            {
                type: "Lunch",
                name: "TANDOORI CHICKEN WITH CAULIFLOWER RICE",
                calories: 399,
                protein: 42.7,
                carbs: 17.7,
                fat: 18.2,
                description: "Tandoori-spiced chicken with fragrant cauliflower rice, finished with a cooling mint yogurt and fresh herbs"
            },
            {
                type: "Dinner",
                name: "BEEF & AUBERGINE BOWL",
                calories: 425,
                protein: 23.5,
                carbs: 41,
                fat: 18.8,
                description: "Minced beef and aubergine in a savory gochujang–tamari sauce, topped with sesame seeds over jasmine rice"
            },
            {
                type: "Snack",
                name: "PROTEIN CHOCO DONUT",
                calories: 151,
                protein: 6.6,
                carbs: 12.5,
                fat: 9.2,
                description: "Powered by Honestry"
            }
        ]
    },
    {
        label: "DAY 3",
        dateLabel: "WEDNESDAY, FEB 25, 2026",
        meals: [
            {
                type: "Breakfast",
                name: "BREAKFAST MUFFIN",
                calories: 419,
                protein: 22.9,
                carbs: 33.7,
                fat: 23.9,
                description: "Breakfast muffins with folded egg, chicken sausage, and melted cheese"
            },
            {
                type: "Lunch",
                name: "MORROCAN BEEF MEZZE",
                calories: 420,
                protein: 30.6,
                carbs: 38.2,
                fat: 18,
                description: "Moroccan-spiced beef tenderloin with aromatic cumin and paprika, served with basmati rice, roasted bell peppers, fresh parsley, and a cooling yogurt sauce"
            },
            {
                type: "Dinner",
                name: "KABSA CHICKEN",
                calories: 416,
                protein: 36.1,
                carbs: 45.1,
                fat: 10.3,
                description: "Kabsa chicken with fragrant basmati rice, slow-simmered tomatoes, warming spices, and a hint of dry lemon"
            },
            {
                type: "Snack",
                name: "STRAWBERRY JAM TURFFLES",
                calories: 77,
                protein: 2.5,
                carbs: 5,
                fat: 5.7,
                description: "Powered by Honestry"
            }
        ]
    },
    {
        label: "DAY 4",
        dateLabel: "THURSDAY, FEB 26, 2026",
        meals: [
            {
                type: "Breakfast",
                name: "VANILLA STALK & JAM",
                calories: 403,
                protein: 16.9,
                carbs: 50.8,
                fat: 16.7,
                description: "Fluffy vanilla protein pancakes with banana, almond butter, fresh raspberries, and a hint of coconut sugar"
            },
            {
                type: "Lunch",
                name: "CHICKEN MUJADARA",
                calories: 400,
                protein: 36.1,
                carbs: 44.7,
                fat: 6.3,
                description: "Grilled chicken with lentil rice, served with yogurt and cucumber mix on the side"
            },
            {
                type: "Dinner",
                name: "LEVANTINE STEAK BOWL",
                calories: 401,
                protein: 26.8,
                carbs: 36.9,
                fat: 13.9,
                description: "Grilled steak over quinoa with arugula, cherry tomatoes, roasted eggplant, crispy chickpeas, hummus, olives, and a silky tahini drizzle"
            },
            {
                type: "Snack",
                name: "BLUEBERRY CRUMBLE",
                calories: 237,
                protein: 4.5,
                carbs: 19.3,
                fat: 16,
                description: "Powered by Honestry"
            }
        ]
    },
    {
        label: "DAY 5",
        dateLabel: "FRIDAY, FEB 27, 2026",
        meals: [
            {
                type: "Breakfast",
                name: "MEDITERRANEAN LABNEH BOWL",
                calories: 404,
                protein: 23.3,
                carbs: 12.1,
                fat: 17.3,
                description: "Creamy labneh with soft eggs, kalamata olives, cucumber, cherry tomatoes, earthy oyster mushrooms, and za’atar"
            },
            {
                type: "Lunch",
                name: "CHICKEN CHIPOTILE BOWL",
                calories: 420,
                protein: 35.9,
                carbs: 46.1,
                fat: 10.4,
                description: "Chipotle chicken bowl with brown basmati rice, black beans, sweet corn, sautéed peppers, creamy avocado, and a cooling yogurt sauce"
            },
            {
                type: "Dinner",
                name: "STEAK BITES & ROASTED SWEET POTATOES",
                calories: 394,
                protein: 31.9,
                carbs: 27.1,
                fat: 12.4,
                description: "Seared steak bites with roasted sweet potatoes and peppers, finished with smoky spices and a bright lemon-tahini drizzle"
            },
            {
                type: "Snack",
                name: "CLASSIC HONEST BROWNIE",
                calories: 303,
                protein: 2.4,
                carbs: 34.9,
                fat: 17,
                description: "Powered by Honestry"
            }
        ]
    }
];
function ProgramPage() {
    const [selectedProgram, setSelectedProgram] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("signature");
    const [selectedWeek, setSelectedWeek] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("current");
    const [selectedCalorieBand, setSelectedCalorieBand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(400);
    const [selectedProtein, setSelectedProtein] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("chicken");
    const [openDayIndex, setOpenDayIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleDayToggle = (index)=>{
        setOpenDayIndex((prev)=>prev === index ? -1 : index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "cart-img",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row g-4 align-items-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-lg-12 p-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cart-rad p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "cart-lil-ty",
                                children: "PROGRAM"
                            }, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 280,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "diet-options pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: "Plan_8",
                                                name: "Plan",
                                                value: "8",
                                                checked: selectedProgram === "signature",
                                                onChange: ()=>setSelectedProgram("signature")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "Plan_8",
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Signature Program"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: "Plan_14",
                                                name: "Plan",
                                                value: "14",
                                                checked: selectedProgram === "ramadan",
                                                onChange: ()=>setSelectedProgram("ramadan")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "Plan_14",
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "RAMADAN Program"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: "Plan_15",
                                                name: "Plan",
                                                value: "15",
                                                checked: selectedProgram === "gut",
                                                onChange: ()=>setSelectedProgram("gut")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "Plan_15",
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Gut Restore"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: "Plan_17",
                                                name: "Plan",
                                                value: "17",
                                                checked: selectedProgram === "gut_al_das_i",
                                                onChange: ()=>setSelectedProgram("gut_al_das_i")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "Plan_17",
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Gut Restore x AL DAS CLINIC |"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: "Plan_18",
                                                name: "Plan",
                                                value: "18",
                                                checked: selectedProgram === "gut_al_das_ii",
                                                onChange: ()=>setSelectedProgram("gut_al_das_ii")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "Plan_18",
                                                style: {
                                                    fontSize: 20
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Gut Restore x AL DAS CLINIC ||"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 283,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "cart-lil-ty",
                                children: "MENU OF WEEK"
                            }, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 352,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "diet-options pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        id: "Current",
                                        name: "Weeks",
                                        value: "CurrentWeek",
                                        checked: selectedWeek === "current",
                                        onChange: ()=>setSelectedWeek("current")
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "Current",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Current Week"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                id: "CurrentDateRange",
                                                children: [
                                                    " ",
                                                    "(23/02/2026 - 27/02/2026)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        id: "Next",
                                        name: "Weeks",
                                        value: "NextWeek",
                                        checked: selectedWeek === "next",
                                        onChange: ()=>setSelectedWeek("next")
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "Next",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Next Week"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 353,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "cart-lil-ty",
                                children: [
                                    "CALORIE RANGE PER MEAL",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "Pspan",
                                        children: selectedCalorieBand ? ` (${selectedCalorieBand} CAL)` : ""
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 383,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "diet-options pt-3",
                                children: [
                                    300,
                                    400,
                                    500,
                                    600,
                                    700
                                ].map((cal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "parentDiv portion",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                id: `Cal_${cal}`,
                                                name: "Calories",
                                                checked: selectedCalorieBand === cal,
                                                onChange: ()=>setSelectedCalorieBand(cal)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: `Cal_${cal}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        cal,
                                                        " CAL"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 399,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, cal, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 389,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "cart-lil-ty",
                                children: [
                                    "PROTEIN PREFERENCE",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "Pspan",
                                        children: selectedProtein ? ` (${selectedProtein})` : ""
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 407,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "diet-options pt-3",
                                children: [
                                    "chicken",
                                    "beef",
                                    "seafood"
                                ].map((protein)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tag-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                className: "tag-checkbox",
                                                id: `Tag_${protein}`,
                                                checked: selectedProtein === protein,
                                                onChange: ()=>setSelectedProtein(selectedProtein === protein ? null : protein)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: `Tag_${protein}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: protein.toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 428,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, protein, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 416,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 437,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "accordion",
                                id: "mealAccordion",
                                children: DAYS.map((day, index)=>{
                                    const isFirst = index === 0;
                                    const isOpen = openDayIndex === index;
                                    const collapseId = `collapse_day_${index}`;
                                    const headingId = `heading_day_${index}`;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "accordion-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "accordion-header",
                                                id: headingId,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `accordion-button ${isOpen ? "" : "collapsed"}`,
                                                    type: "button",
                                                    onClick: ()=>handleDayToggle(index),
                                                    "aria-expanded": isOpen,
                                                    "aria-controls": collapseId,
                                                    children: [
                                                        day.label,
                                                        " | ",
                                                        day.dateLabel
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                id: collapseId,
                                                className: `accordion-collapse collapse ${isOpen ? "show" : ""}`,
                                                "aria-labelledby": headingId,
                                                "data-bs-parent": "#mealAccordion",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "accordion-body",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "row",
                                                        children: day.meals.map((meal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "col-md-3 mb-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "card h-100 shadow-sm border-0 rounded-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "card-header bg-light text-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                                                    className: "mb-0",
                                                                                    style: {
                                                                                        textTransform: "uppercase",
                                                                                        display: "none"
                                                                                    },
                                                                                    children: meal.type
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 473,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-muted",
                                                                                    children: meal.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 482,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                            lineNumber: 472,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "card-body",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                                                    className: "fw-bold mb-2",
                                                                                    children: "Nutrition Facts"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 485,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                                                    className: "table table-sm mb-3",
                                                                                    style: {
                                                                                        fontFamily: "PPNeueMontrealMono"
                                                                                    },
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: "Calories"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 497,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 496,
                                                                                                        columnNumber: 43
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        className: "text-end",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: [
                                                                                                                meal.calories.toFixed(1),
                                                                                                                " kcal"
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 500,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 499,
                                                                                                        columnNumber: 43
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                lineNumber: 495,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: "Protein"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 507,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 506,
                                                                                                        columnNumber: 43
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        className: "text-end",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: [
                                                                                                                meal.protein.toFixed(1),
                                                                                                                " g"
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 510,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 509,
                                                                                                        columnNumber: 43
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                lineNumber: 505,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: "Carbohydrates"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 517,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 516,
                                                                                                        columnNumber: 43
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        className: "text-end",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: [
                                                                                                                meal.carbs.toFixed(1),
                                                                                                                " g"
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 520,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 519,
                                                                                                        columnNumber: 43
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                lineNumber: 515,
                                                                                                columnNumber: 41
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: "Fat"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 527,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 526,
                                                                                                        columnNumber: 43
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                                        className: "text-end",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                                                            children: [
                                                                                                                meal.fat.toFixed(1),
                                                                                                                " g"
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                            lineNumber: 530,
                                                                                                            columnNumber: 45
                                                                                                        }, this)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                        lineNumber: 529,
                                                                                                        columnNumber: 43
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                                lineNumber: 525,
                                                                                                columnNumber: 41
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                        lineNumber: 494,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 488,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                                                                    className: "fw-bold mb-2",
                                                                                    children: "Description"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 537,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "small text-muted mb-0",
                                                                                    children: meal.description
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                                    lineNumber: 540,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                            lineNumber: 484,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                    lineNumber: 471,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, meal.type, false, {
                                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 31
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/Home/Program/page.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, day.label, true, {
                                        fileName: "[project]/src/app/Home/Program/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/Home/Program/page.tsx",
                                lineNumber: 438,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/Home/Program/page.tsx",
                        lineNumber: 279,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/Home/Program/page.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/Home/Program/page.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/Home/Program/page.tsx",
            lineNumber: 276,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/Home/Program/page.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_Home_Program_page_tsx_3f24680e._.js.map
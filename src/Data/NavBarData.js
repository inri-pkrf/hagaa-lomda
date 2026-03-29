const NavBarData = [
    {
        title: "יחידה 1 - מבוא",
        color: "#40d4ff",
        chapters: [
            { title: "פתיחה", path: "/unit-opening/UnitOne" },
            { title: "מטרות", path: "/goals" },
            { title: "היערכות לאיומים", path: "/threats" },
            {
                title: "מצבי תפקוד", path: "/states",
                subChapters: [
                    { title: "שיעור 1" },
                    { title: "שיעור 2" },
                    { title: "שיעור 3" }
                ]
            },
            { title: "ממשקים", path: "/interfaces" },
            {
                title: "אוכלוסיה", path: "/population",
                subChapters: [
                    { title: "שיעור 1", path: "/populationInfo" },
                    { title: "שיעור 2", path: "/population-parts" },
                    { title: "שיעור 3", path: "/populationGame" }
                ]
            },
            { title: "שאלות סיכום", path: "/questions-end" },
            { title: "סיכום פרק", path: "/summary-checklist" },
        ]
    }
];

export default NavBarData;
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Live Terminal Simulator Typing Sequence ---
    const scripts = [
        { text: "✔ Establishing hypervisor connection node-9950x-02...", class: "success" },
        { text: "✔ Allocating dedicated AMD Ryzen cores (KVM isolated)...", class: "success" },
        { text: "✔ Mounting NVMe block arrays (Read: 14.5 GB/s)...", class: "success" },
        { text: "✔ Initializing Path.net DDoS filters...", class: "success" },
        { text: "✔ Generating server instances profile...", class: "success" },
        { text: "⚡ Assigned KVM VPS IPv4: 185.22.144.11", class: "output" },
        { text: "⚡ Dedicated DDR5 Memory Range verified cleanly.", class: "output" },
        { text: "✔ KVM Instance is up and responding to ICMP. Node fully live.", class: "success" }
    ];

    const terminalBody = document.getElementById("terminalBody");
    const typingLine = document.getElementById("typingLine");
    const runBtn = document.getElementById("runProvisionBtn");
    
    let currentLineIndex = 0;
    
    function runTerminalSimulation() {
        // Clear previous runs
        const oldLines = terminalBody.querySelectorAll(".line-output");
        oldLines.forEach(line => line.remove());
        typingLine.textContent = "";
        currentLineIndex = 0;
        
        typeLine(scripts[currentLineIndex]);
    }

    function typeLine(lineObj) {
        if (!lineObj) return;
        
        let charIndex = 0;
        typingLine.className = "line active-typing";
        
        function typeChar() {
            if (charIndex < lineObj.text.length) {
                typingLine.textContent += lineObj.text[charIndex];
                charIndex++;
                setTimeout(typeChar, 20); // Character typing interval
            } else {
                // Completed typing current line
                typingLine.className = "line"; // remove typing blink cursor
                
                // Transition typed line into static terminal layout
                const completedLine = document.createElement("div");
                completedLine.className = `line line-output ${lineObj.class}`;
                completedLine.textContent = typingLine.textContent;
                
                // Insert printed line right before the action cursor input row
                terminalBody.insertBefore(completedLine, typingLine);
                
                // Clear active line row
                typingLine.textContent = "";
                
                currentLineIndex++;
                if (currentLineIndex < scripts.length) {
                    setTimeout(() => {
                        typeLine(scripts[currentLineIndex]);
                    }, 350); // Wait interval before typing next command array line
                }
            }
        }
        typeChar();
    }

    // Trigger terminal scripts sequence on start
    runTerminalSimulation();

    // Re-run triggers manually
    runBtn.addEventListener("click", runTerminalSimulation);


    // --- Spotlight Move Gradient Tracking Logic ---
    const spotlightCards = document.querySelectorAll(".spotlight-card");

    spotlightCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Apply dynamic CSS background gradient mask positioning based on cursor coordinate metrics
            card.style.background = `radial-gradient(1000px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.05) 0%, rgba(9, 9, 14, 0.7) 60%)`;
            
            // Adjust linear gradient border glow vector values inside tracking loop
            const borderBeam = card.querySelector(".card-border-beam");
            if (borderBeam) {
                borderBeam.style.background = `radial-gradient(250px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.15) 0%, rgba(255,255,255,0.01) 100%) border-box`;
            }
        });

        card.addEventListener("mouseleave", () => {
            // Revert card states cleanly
            card.style.background = "var(--card-bg)";
            const borderBeam = card.querySelector(".card-border-beam");
            if (borderBeam) {
                borderBeam.style.background = "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)) border-box";
            }
        });
    });

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const panel = item.querySelector(".faq-panel");

        trigger.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all other open FAQ items first
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-panel").style.maxHeight = null;
                }
            });

            // Toggle active status
            if (isActive) {
                item.classList.remove("active");
                panel.style.maxHeight = null;
            } else {
                item.classList.add("active");
                panel.style.maxHeight = panel.scrollHeight + "px"; // Calculate scroll height for perfect animation
            }
        });
    });



    // --- Ryzen VPS Dynamic Specification Configurator Slider ---
    const cpuSlider = document.getElementById("computeCpu");
    const ramSlider = document.getElementById("computeRam");

    const cpuLabel = document.getElementById("cpuLabel");
    const ramLabel = document.getElementById("ramLabel");

    const specBw = document.getElementById("specBw");
    const specStorage = document.getElementById("specStorage");
    const computedPrice = document.getElementById("computedPrice");

    const resources = {
        cpu: [
            { text: "1 Core (Ryzen 9)", cost: 5 },
            { text: "2 Cores (Ryzen 9)", cost: 10 },
            { text: "4 Cores (Ryzen 9)", cost: 20 },
            { text: "8 Cores (Ryzen 9)", cost: 40 }
        ],
        ram: [
            { text: "4 GB DDR5 ECC", cost: 3, bw: "1 Gbps Port", disk: "60 GB Gen5 NVMe" },
            { text: "8 GB DDR5 ECC", cost: 6, bw: "2.5 Gbps Port", disk: "120 GB Gen5 NVMe" },
            { text: "16 GB DDR5 ECC", cost: 12, bw: "10 Gbps Port", disk: "240 GB Gen5 NVMe" },
            { text: "32 GB DDR5 ECC", cost: 24, bw: "10 Gbps Port", disk: "480 GB Gen5 NVMe" }
        ]
    };

    function recalculateSpecs() {
        const cpuIndex = cpuSlider.value - 1;
        const ramIndex = ramSlider.value - 1;

        const currentCpu = resources.cpu[cpuIndex];
        const currentRam = resources.ram[ramIndex];

        // Label overrides
        cpuLabel.textContent = currentCpu.text;
        ramLabel.textContent = currentRam.text;

        // Visual specifications overrides
        specBw.textContent = currentRam.bw;
        specStorage.textContent = currentRam.disk;

        // Pricing math
        const priceSum = currentCpu.cost + currentRam.cost;
        computedPrice.textContent = priceSum;
    }

    [cpuSlider, ramSlider].forEach(slider => {
        slider.addEventListener("input", recalculateSpecs);
    });

    // Run once at load
    recalculateSpecs();
});


const header = document.querySelector('#header');
const footer = document.querySelector('#footer');
window.addEventListener('load', function () {
    this.document.head.insertAdjacentHTML('beforeend',
        '<script src="tailwind.js"></script>',
        '<link rel="stylesheet" href="design.css">');

    header.innerHTML = `
        
        <nav class="glass-nav fixed top-5 left-1/2 -translate-x-1/2 z-50
w-[95%] md:w-[92%] lg:w-[86%] xl:w-[80%] 2xl:w-[76%] max-w-7xl">

            <div class="flex justify-between items-center px-6 py-3">
                <a href="index.html" class="flex items-center gap-3">
                    <img src="../amws logo.jpg" alt="AM World School Logo" class="h-12 w-auto object-contain"
                        onerror="this.style.display='none'" />
                    <span class="font-headline-sm text-headline-sm text-primary font-bold hidden sm:inline">
                        AM World School
                    </span>
                </a>

                
                <div class="hidden md:flex items-center gap-gutter font-label-md text-label-md">
                    <a class="text-on-surface-variant font-bold text-[16px] hover:text-secondary transition-colors duration-200"
                        href="index.html">Home</a>
                    <div class="relative group">

                        
                        <button
                            class="flex items-center gap-1 text-on-surface-variant font-bold text-[16px] hover:text-secondary transition-colors duration-300">

                            About Us

                            <span
                                class="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">
                                expand_more
                            </span>

                        </button>

                        
                        <div class="absolute left-0 top-full pt-4 z-50
               opacity-0 invisible translate-y-3
               group-hover:opacity-100
               group-hover:visible
               group-hover:translate-y-0
               transition-all duration-300 ease-out">

                            <div class="glass-dropdown w-72 overflow-hidden">

                                <a href="about_us.html" class="dropdown-item">
                                    About AM World School
                                </a>

                                <a href="director_message.html" class="dropdown-item">
                                    Director's Message
                                </a>

                                <a href="principal_message.html" class="dropdown-item">
                                    Principal's Message
                                </a>

                                <a href="vision_mission.html" class="dropdown-item">
                                    Vision & Mission
                                </a>

                                <a href="management.html" class="dropdown-item">
                                    School Management
                                </a>

                            </div>

                        </div>

                    </div>

                    
                    <div class="relative group">
                        <button
                            class="flex items-center gap-1 text-on-surface-variant font-bold text-[16px] hover:text-secondary transition-colors duration-300">

                            Admissions

                            <span
                                class="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">
                                expand_more
                            </span>

                        </button>

                        
                        <div class="absolute left-0 top-full pt-4 z-50
               opacity-0 invisible translate-y-3
               group-hover:opacity-100
               group-hover:visible
               group-hover:translate-y-0
               transition-all duration-300 ease-out">

                            <div class="glass-dropdown w-72 overflow-hidden">

                                <a href="about_us.html" class="dropdown-item">
                                    1
                                </a>

                                <a href="director_message.html" class="dropdown-item">
                                    2
                                </a>

                                <a href="principal_message.html" class="dropdown-item">
                                    Principal's Message
                                </a>

                                <a href="vision_mission.html" class="dropdown-item">
                                    Vision & Mission
                                </a>

                                <a href="management.html" class="dropdown-item">
                                    School Management
                                </a>

                            </div>

                        </div>
                    </div>

                    <a class="text-primary font-bold text-[16px] border-b-2 border-secondary pb-1 transition-colors duration-200"
                        href="academic.html">Academic</a>

                    <a class="text-on-surface-variant font-bold text-[16px] hover:text-secondary transition-colors duration-200"
                        href="downloads.html">Downloads</a>
                    <a class="text-on-surface-variant font-bold text-[16px] hover:text-secondary transition-colors duration-200"
                        href="facilities.html">Facilities</a>
                </div>
                <div class="flex items-center gap-unit">
                    <button
                        class="hidden md:inline-flex items-center justify-center px-4 py-2 bg-little text-primary font-bold font-label-md text-label-md rounded-lg hover:bg-secondary-fixed-dim transition-colors"><a
                            href="contact_us.html">Contact
                            Us</a></button>
                    
                    <div class="relative group hidden md:block">

                        <button
                            class="inline-flex items-center justify-center gap-1 px-4 py-1.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all duration-300">
                            Login
                            <span
                                class="material-symbols-outlined text-lg transition-transform duration-300 group-hover:rotate-180">
                                expand_more
                            </span>
                        </button>

                        
                        <div
                            class="absolute right-0 mt-2 w-62 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out overflow-hidden z-50">

                            <a href="https://play.google.com/store/apps/details?id=simption.amworldschoolchandausi"
                                class="block px-6 py-3 whitespace-nowrap hover:bg-red-50 hover:text-red-700 transition-all duration-200">
                                🎓 Student & Parents Login
                            </a>

                            <a href="https://simptionsmartsoftware.com/amworldschool/"
                                class="block px-6 py-3 whitespace-nowrap hover:bg-red-50 hover:text-red-700 transition-all duration-200 border-t">
                                💻 ERP Login
                            </a>

                        </div>

                    </div>
                    <button id="menuBtn" class="md:hidden">
                        <span class="material-symbols-outlined text-[34px]">
                            menu
                        </span>
                    </button>
                </div>
            </div>
        </nav>
        

        <div id="mobileMenu" class="fixed inset-0
    bg-white/80
    backdrop-blur-2xl
    z-[999]
    overflow-y-auto
    overscroll-contain
    translate-y-[-100%]
    opacity-0
    transition-all
    duration-500
    ease-in-out">

            <button id="closeMenu" class="fixed top-6 right-6 z-[1001]
    w-12 h-12
    flex items-center justify-center
    rounded-full
    bg-white/70
    backdrop-blur-xl
    shadow-lg
    hover:bg-white
    transition">

                <span class="material-symbols-outlined text-3xl">
                    close
                </span>

            </button>

            <div class="pt-8 px-6">

                <span class="font-bold text-2xl text-primary">
                    AM World School
                </span>

            </div>

            <div class="flex flex-col pt-8 pb-10">

                <a href="index.html" class="mobile-link active">Home</a>

                
                <button id="aboutToggle" class="mobile-link w-full">

                    <span>About Us</span>

                    <span id="aboutArrow" class="material-symbols-outlined transition-transform duration-300">
                        expand_more
                    </span>

                </button>

                <div id="aboutMenu" class="hidden flex-col bg-gray-50">

                    <a href="about_us.html" class="mobile-link pl-12 text-[16px] font-body-md">
                        About AM World School
                    </a>

                    <a href="director_message.html" class="mobile-link pl-12 text-[16px] font-body-md">
                        Director's Message
                    </a>

                    <a href="principal_message.html" class="mobile-link pl-12 text-[16px] font-body-md">
                        Principal's Message
                    </a>

                    <a href="vision_mission.html" class="mobile-link pl-12 text-[16px] font-body-md">
                        Vision & Mission
                    </a>

                    <a href="management.html" class="mobile-link pl-12 text-[16px] font-body-md">
                        School Management
                    </a>

                </div>

                <a href="admission.html" class="mobile-link">Admissions</a>

                <a href="academic.html" class="mobile-link">Academic</a>

                <a href="downloads.html" class="mobile-link">Downloads</a>

                <a href="facilities.html" class="mobile-link">Facilities</a>

                <a href="contact_us.html" class="mobile-link">Contact Us</a>

                <hr class="my-6">

                <button id="loginToggle" class="mobile-link w-full">
                    <span>Login</span>

                    <span id="loginArrow" class="material-symbols-outlined transition-transform duration-300">
                        expand_more
                    </span>
                </button>

                <div id="loginMenu" class="hidden flex-col bg-gray-50">

                    <a href="https://play.google.com/store/apps/details?id=simption.amworldschoolchandausi"
                        class="mobile-link pl-12 text-[16px]">
                        🎓 Students & Parents Login
                    </a>

                    <a href="https://simptionsmartsoftware.com/amworldschool/" class="mobile-link pl-12 text-[16px]">
                        💻 ERP Login
                    </a>

                </div>

            </div>

        </div>`;


    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-y-[-100%]", "opacity-0");
        mobileMenu.classList.add("translate-y-0", "opacity-100");
    });



    footer.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto px-gutter py-margin-desktop">
            <div>
                <div class="font-headline-sm text-headline-sm font-bold text-secondary-container mb-4">
                    AM World School
                </div>
                <p class="font-body-md text-body-md opacity-80">
                    Little Hands will win the World.
                    <br />
                    A premier institution dedicated to
                    academic excellence.
                </p>
            </div>
            <div>
                <h4 class="font-label-md text-label-md uppercase text-secondary-container mb-4">Contact
                    Info</h4>
                <div class="flex flex-col gap-unit font-body-md text-body-md opacity-80">
                    <p class="flex justify-center gap-3 w-fit mx-auto md:mx-0 md:w-full md:justify-start">
                        <span class="material-symbols-outlined text-[20px] flex-shrink-0">location_on</span>
                        <span>AM WORLD SCHOOL, Bahjoi Road, Maulagarh, Chandausi, Sambhal<br />Pin
                            code: 244412</span>
                    </p>
                    <br>
                    <p class="flex items-center justify-center gap-3 w-fit mx-auto md:mx-0 md:w-full md:justify-start">
                        <span class="material-symbols-outlined text-[20px] flex-shrink-0">
                            phone
                        </span>
                        <span class="text-center md:text-left">
                            +91 9012688800<br>
                            +91 8002148800
                        </span>
                    </p>

                    <p
                        class="flex items-center justify-center gap-3 w-fit mx-auto md:mx-0 md:w-full md:justify-start mt-4">
                        <span class="material-symbols-outlined text-[20px] flex-shrink-0">
                            mail
                        </span>
                        <span class="text-center md:text-left">
                            amworldschools@gmail.com
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <h4 class="font-label-md text-label-md uppercase text-secondary-container mb-4">Quick
                    Links</h4>
                <ul class="space-y-2 font-body-md text-body-md opacity-80">
                    <li><a class="hover:text-secondary-fixed hover:underline transition-all duration-200"
                            href="index.html">Quick
                            Links</a></li>
                    <li><a class="hover:text-secondary-fixed hover:underline transition-all duration-200"
                            href="news.html">News
                            &amp; Events</a></li>
                    <li><a class="hover:text-secondary-fixed hover:underline transition-all duration-200"
                            href="gallery.html">Gallery</a></li>
                    <li><a class="hover:text-secondary-fixed hover:underline transition-all duration-200"
                            href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-label-md text-label-md uppercase text-secondary-container mb-4">
                    Newsletter</h4>
                <p class="font-body-md text-body-md opacity-80 mb-4">Stay updated with our latest
                    academic events and news.</p>
                <div class="flex">
                    <input
                        class="bg-primary-container border border-outline rounded-l-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-secondary-container outline-none text-on-primary placeholder:text-on-primary/50"
                        placeholder="Your email" type="email" />
                    <button
                        class="bg-secondary-container text-on-secondary-container px-4 rounded-r-lg font-label-md text-label-md font-bold hover:brightness-110 transition-all">Join</button>
                </div>
            </div>
        </div>
        <div
            class="border-t border-on-primary/20 py-4 text-center font-body-md text-body-md opacity-60 max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between gap-1">
            <span>© 2026 AM World School. All rights reserved.</span>
            <span>Made with ❤️ by Alekh Singh (Student of AM World School)</span>
        </div>`;


});

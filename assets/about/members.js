var imgHost = '../assets/img'; //'https://saudade-studio.ru/assets/img';

try {
    fetch('https://api.eightyseven.ru/saudade/members').then(function (response) {
        switch (response.status) {
            // status "OK"
            case 200:
                return response.text();
            // status "Not Found"
            case 404:
                throw response;
        }
    }).then(function (template) {
        var json = JSON.parse(template);
        var html = ``;
        
        json.categories.forEach(category => {
            category.subcategories[0].name != null ? html += `<h1 class="text-4xl font-bold font-manrope mt-6" style="font-family:var(--main-font-bold)">${category.name}</h1>`
            : html += `<h1 class="text-4xl font-bold font-manrope mt-6 mb-8" style="font-family:var(--main-font-bold)">${category.name}</h1>`;

            category.subcategories.forEach(subcategory => {
                if (subcategory.name != null) html += `<div class="text-2xl font-bold mt-3 mb-8 font-manrope">${subcategory.name}</div>`;
                html += `<div class="grid grid-cols-1 lg:grid-cols-${subcategory.columns} gap-6 mb-5">`;

                subcategory.members.forEach(member => {
                    var contacts = ``;
                    member.contacts.forEach(contact => {
                        var contactIcon;
                        if (contact.id == "vk") contactIcon = `<svg fill="#ffffff" viewBox="0 0 42 26" class="${member.contacts.length == 1 ? `mr-2` : ``} h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M41.0375 2.409C41.328 1.4535 41.0375 0.75 39.6463 0.75H35.0525C33.8835 0.75 33.3445 1.35725 33.0522 2.0275C33.0522 2.0275 30.716 7.6205 27.4068 11.2535C26.3358 12.307 25.8493 12.6413 25.2648 12.6413C24.9725 12.6413 24.5333 12.307 24.5333 11.3498V2.409C24.5333 1.261 24.2113 0.75 23.2383 0.75H16.0143C15.2845 0.75 14.8452 1.282 14.8452 1.78775C14.8452 2.8745 16.5008 3.1265 16.6705 6.1855V12.832C16.6705 14.2898 16.4027 14.554 15.8182 14.554C14.2607 14.554 10.472 8.93475 8.22325 2.50525C7.7875 1.254 7.3465 0.75 6.17225 0.75H1.575C0.2625 0.75 0 1.35725 0 2.0275C0 3.221 1.5575 9.15 7.25375 16.9918C11.0513 22.3468 16.3975 25.25 21.2677 25.25C24.1885 25.25 24.549 24.606 24.549 23.4948V19.447C24.549 18.1573 24.8255 17.9 25.7513 17.9C26.4338 17.9 27.601 18.236 30.3275 20.8173C33.4425 23.878 33.9553 25.25 35.7088 25.25H40.3025C41.615 25.25 42.273 24.606 41.895 23.332C41.4785 22.065 39.991 20.2258 38.0188 18.0435C36.9478 16.801 35.3413 15.4623 34.853 14.792C34.1723 13.9328 34.3665 13.5495 34.853 12.7848C34.853 12.7848 40.453 5.03925 41.0357 2.409H41.0375Z"></path>
                            </svg>`
                        else if (contact.id == "discord") contactIcon = `<svg fill="#ffffff" viewBox="0 0 24 24" class="${member.contacts.length == 1 ? `mr-2` : ``} h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                            </svg>`
                        else if (contact.id == "tg") contactIcon = `<svg fill="#ffffff" viewBox="0 0 24 24" class="${member.contacts.length == 1? `mr-2` : ``} h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.53419 10.491 20.4342 3.72755c.5979-.22564 1.2652.07521 1.4908.67307.0791.21021.0964.43779.0482.65668l-3.0857 14.0805c-.1562.7136-.8611 1.1658-1.5747 1.0086-.1774-.0385-.3442-.1138-.4918-.2198l-6.1453-4.4415c-.3694-.2671-.4533-.784-.1852-1.1543.0289-.0395.0617-.0771.0964-.1118l6.319-6.07213c.1311-.12632.135-.33557.0087-.46768-.109-.11282-.2826-.13404-.4156-.04918L7.88597 13.0975c-.5101.324-1.13978.3973-1.7116.1996l-3.618-1.2516c-.43103-.1485-.65957-.6201-.51107-1.0511.081-.2314.25939-.4166.48889-.5034Z"></path>
                            </svg>`
                        else if (contact.id == "email") contactIcon = `<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="${member.contacts.length == 1 ? `mr-2` : ``} h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>`

                        contacts += `<a href="${contact.url}" class="inline-flex cursor-pointer mt-2 border-0 px-5 py-2.5 font-medium leading-5 text-zinc-50 transition ease-in-out bg-zinc-800 rounded-lg focus:outline-none focus:ring-0 hover:bg-zinc-700 active:bg-zinc-600 select-none">
                                ${contactIcon}${member.contacts.length == 1 ? `Связаться` : ``}
                            </a>`
                    });

                    if (member.type == "member") {
                        html += `<div class="lg:col-span-1 text-zinc-100 border-2 border-zinc-800 rounded-lg h-full flex">
                            ${member.icon != null ? `<div class="-mt-12 py-5">
                                <div class="border-0 w-24 md:w-32 h-full ml-4 rounded-br-lg overflow-hidden flex justify-center items-center pt-10">
                                    <img height="213" src="${imgHost + member.icon}" width="233">
                                </div>
                            </div>` : `<div class="-mt-12 py-5">
                                <div class="border-0 w-24 md:w-32 h-full ml-4 rounded-br-lg overflow-hidden flex justify-center items-center pt-10">
                                    <img height="213" src="https://em-content.zobj.net/source/microsoft-teams/363/bust-in-silhouette_1f464.png" width="233">
                                </div>
                            </div>`}
                            <div class="p-6 w-full flex items-center">
                                <div>
                                    <div class="block font-medium text-zinc-200">${member.role}</div>
                                    <div class="text-zinc-100 text-2xl font-semibold truncate font-manrope" style="font-family:var(--main-font-bold)">${member.name}</div>
                                    <div class="flex gap-3">${contacts}</div>
                                </div>
                            </div>
                        </div>`;
                    } else if (member.type == "email") {
                        html += `<div class="lg:col-span-1 text-zinc-100 border-2 border-zinc-800 rounded-lg h-full flex">
                            <div class="p-6 w-full flex items-center">
                                <div>
                                    <div class="block font-medium text-zinc-200">${member.role}</div>
                                    <div class="text-zinc-100 text-2xl font-semibold flex items-center truncate font-manrope select-text" style="font-family:var(--main-font-bold)">${member.email.name}<span class="text-zinc-100/80">@${member.email.domain}</span></div>
                                    <div class="md:flex gap-3">${contacts}</div>
                                </div>
                            </div>
                        </div>`;
                    }
                });

                html += `</div>`;
            });
        });

        $('#members').empty();
        $('#members').append(html.replace("undefined", ""));

        
        $('.tooltip').hover(
            function() {
                var text = $(this).attr('data-notify');
                $(this).find('.tooltip-text').text(text);
            },

            function() {
                $(this).find('.tooltip-text').text('');
            }
        );
    }).catch(function (response) {
        // "Not Found"
        console.log(response);
    });
} catch (e) {
    console.log(e);
}
try {
    fetch('https://api.esvn.group/saudade/modpacks').then(function (response) {
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
        
        json.modpacks.forEach(element => {
            var downloads = `<div class="grid md:flex md:gap-4 mt-2 md:mt-0">`;
            element.downloads.forEach(download => {
                downloads += `<a href="${download.url}" class="text-zinc-400 hover:text-zinc-200 font-semibold cursor-pointer transition">${download.name}</a>`;
            });
            downloads += `</div>`;

            html += `<div class="lg:col-span-1 text-zinc-100 border-2 border-zinc-800 rounded-lg h-full flex">
            <div class="-mt-12">
              <div class="border-0 w-32 h-full ml-4 rounded-br-lg overflow-hidden flex justify-center items-center pt-10">
                <img class="h-28 w-28" src="${element.icon}">
              </div>
            </div>
            <div class="p-6 w-full grid items-center">
              <div class="grid gap-2 md:flex md:gap-4">
                <div class="grid grid-flow-col items-center justify-start gap-3 font-medium text-zinc-200 md:justify-center md:gap-2">
                  <div class="tooltip" data-notify="Версия сборки">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-5 w-5 md:h-5 md:w-5 md:mr-1 md:mb-0.5 text-zinc-300" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="10" y="5" width="10" height="14" rx="2"></rect>
                      <line x1="7" y1="7" x2="7" y2="17"></line>
                      <line x1="4" y1="8" x2="4" y2="16"></line>
                    </svg>

                    ${element.version}
                    <div class="tooltip-text"></div>
                  </div>                                
                </div>
                
                <div class="grid grid-flow-col items-center justify-start gap-3 font-medium text-zinc-200 md:justify-center md:gap-2">
                  <div class="tooltip" data-notify="Дата выхода">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-5 w-5 md:h-4.5 md:w-4.5 md:mr-0.5 md:mb-1 text-zinc-300" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="11" y1="15" x2="12" y2="15"></line>
                      <line x1="12" y1="15" x2="12" y2="18"></line>
                    </svg>
                    ${element.releaseDate}
                    <div class="tooltip-text"></div>
                  </div>
                </div>
                
                ${element.author != null ? `<div class="grid grid-flow-col items-center justify-start gap-3 font-medium text-zinc-200 md:justify-center md:gap-2">
                  <div class="tooltip" data-notify="Автор">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-5 w-5 md:h-4.5 md:w-4.5 md:mr-1 md:mb-0.5 text-zinc-300" fill="currentColor" width="800px" height="800px" viewBox="0 0 1000 1000"><path d="M738 756q-45-77-131-205-6-8-14-15-2-2-1.5-4.5t2.5-3.5q60-29 97-83 40-58 40-124 0-63-31-116t-84-84-116-31-116 31-84 84-31 116q0 66 40 124 37 54 97 83 2 1 2.5 3.5T407 536q-8 7-14 15-88 130-131 205-18 32-18 52 0 27 34.5 50.5t93 37.5T500 910t128.5-14 93-37.5T756 808q0-21-18-52z"/></svg>
                    ${element.author}
                    <div class="tooltip-text"></div>
                  </div>
                </div>` : ``}

                </div>          
                
                <div class="text-zinc-100 text-2xl md:text-3xl font-semibold font-manrope mt-3 md:mt-2" style="font-family:var(--main-font-bold)">${element.name}</div>
                <div class="text-zinc-300 text-lg font-semibold font-manrope mt-3 md:mt-1" style="font-family:var(--main-font-semibold)">Доступно к скачиванию:
                  ${downloads}
                </div>

            </div>
            </div>
          </div>`
        });

        $('#modpacks').empty();
        $('#modpacks').append(html.replace("undefined", ""));

        
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
        console.log(response.statusText);
    });
} catch (e) {
    console.log(e);
}
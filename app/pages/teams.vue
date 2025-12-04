<template >

  <div class="teams-content" v-if="currentteaminfo">
        <div  class="bg" :style="`background: linear-gradient(90deg,${currentteaminfo.color1} 15%, ${currentteaminfo.color2} 15%, ${currentteaminfo.color2} 85%, ${currentteaminfo.color3} 85%);`"></div>  
        <div class="maintext">
          <img :src="getRoadById(currentteamindex)">
          <h2 :style="`color:${currentteaminfo.color3}`" >{{ currentteaminfo.name }}</h2>
        </div>
    
    <div class="stats">
    
    </div>
    <div class="team">

    </div>
    
    <button  @click="leftclick" class="arrowbtn leftbtn" :style="`border-color:${currentteaminfo.color2}`"></button>
    <button  @click="rightclick" class="arrowbtn rightbtn" :style="`border-color:${currentteaminfo.color2}`"></button>

    <button @click="switchToDefaut" class="menu-button next">
      Spustit aplikaci
    </button>
    <div class="backgroundcar">
       
      <svg id="Vrstva_1" data-name="Vrstva 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1079.66 233.8" class="dynamic-svg" :style="{ '--team-color': currentteaminfo.color3 }">
        <defs>
        </defs>
        <path :style="`fill:#1e1e1e;`"  d="M826.45,84.95c57.7-5.9,104.68,48.63,80.06,104.06-36.58,82.37-169.69,42.89-141.8-51.8,8.14-27.65,32.7-49.3,61.73-52.27ZM873.31,121.01c-6.94-6.61-19.71-13.13-29.26-14.24-66.95-7.84-84.2,92.14-15.62,104.62,50.52,9.19,82.09-54.94,44.88-90.38Z"/>
        <circle :style="`fill:#191919;`" cx="837.06" cy="159.16" r="49.67"/>
        <path :style="`fill:${currentteaminfo.color2}`" d="M786.65,217.68l-.5,1.99c-31.38-.91-49.56-27.4-57.15-55.05-24.9.51-49.3,6.7-73.98,9.9-148.28,19.26-297.24,7.75-445.87,1.15-9.82-.44-19.7.07-29.49-1.01,1.42-11.02,1.04-21.97,0-33.01,17.3-.14,34.45-3.76,51.63-5.87,124.88-15.36,250.07-24.05,375.83-25.17,35.05-.31,75.43-1.22,109.92,3.18,16.73,2.13,33.51,6.51,48.19,14.87.97,1.53-3.26,13.03-3.9,16.17-5.36,26.55,2.24,57.36,25.33,72.85Z"/>
        <path :style="`fill:${currentteaminfo.color1}`" class="cls-6" d="M693.66,170.66c.17,4.47-.26,9.02,0,13.49.45,7.62,1.81,16.41,2.03,23.97.2,6.91-.97,12.19-7.47,15.62-62.22,5.63-124.8,2.08-187.11-.03l-330.45-24.05,8.6-23.06,166.93,6.02c78.4,2.84,154.33,6.65,232.95,1.03,38.33-2.74,76.45-8.08,114.51-12.99Z"/>
        <path :style="`fill:${currentteaminfo.color2}`" class="cls-1" d="M646.66,66.65l-22.41,3c-31.93-21.94-70.68-3.66-104.59,3.01l6.99,11.99c-35.19,4.78-70.28,10.43-105.33,16.17-69.1,11.33-138.12,25.52-207.33,35.67-11.72,1.72-23.61,2.54-35.33,4.17l-4-16c32.15-7.44,60.39-25.2,90.33-38.18,54.22-23.51,115.87-34.66,175.02-33.87l3.14,9.06c2.24,2.66,15.22-.73,19.03-1.01,17.9-1.27,36.1-1.04,53.98-3.02,35.38-3.91,71.23-21.48,105.72-5.71,8.34,3.81,17.34,9.54,24.79,14.7Z"/>
        <path :style="`fill:${currentteaminfo.color1}`" class="cls-3" d="M471.66,24.67c-3.55,8.65-7.63,17.4-8,26.99-12.84-.68-25.64-1.41-38.53-1.03-60.74,1.76-118.69,14.15-173.82,39.18-21.08,9.57-51.23,27.55-73.41,31.62-1.22.22-2.92.7-4.04.04-.79-.46-7.66-12.45-10.22-15.27-3.15-3.48-6.63-5.85-9.97-9.03,11.77-2.41,37.28-3.54,42.04-16.94,3.2-9.02-2.89-14.78-6.04-22.55,55.36,14,107.22-10.24,159.98-22.52,33.57-7.82,57.02-10.74,91.47-10.44,10.18.09,20.37-.15,30.54-.04Z"/>
        <path :style="`fill:${currentteaminfo.color1}`" class="cls-4" d="M802.66,89.66l-11.91,7.59c-11.01,7.67-17.93,18.96-24.57,30.31-16.65-9.65-35.93-14.04-55.03-15.89-47.72-4.63-97.15-1.82-144.95-.96-58.22,1.04-116.01,2.67-174.03,6.97-43.73,3.24-87.41,8.21-130.97,13.04l-3.53-1.04,268.55-44.06c3.39.09,9.48,8,14.04,9.96,12.33,5.28,27.14,2.44,39.86,2.05,11.85-.36,23.7-.71,35.55-.96,1.41-1.45-3.65-12.72-3.99-15.53-.26-2.13.85-1.62,2.48-1.48,9.19.83,14.27,6.99,14.51,16.01l14-2.01c-2.7-9.4-10.93-15.75-17-22.98,7,.51,15.92-3.09,22.55-2.87,2.7.09,40.53,21.81,47.77,25.04,11.63,5.19,35.18,14.76,47.31,15.76,5.54.45,8.65-4.95,13.04-7.75,6.29-4.02,24.72-11.18,31.82-11.18h14.5Z"/>
        <path :style="`fill:${currentteaminfo.color1}`"class="cls-7" d="M140.98,87c-34.32-17.59-76.33-8.94-104.49,15.98L8,22c25.18,5.24,50.8,8.49,76.04,13.45,2.57.5,4.51,2.03,6.56,2.44,14.85,2.98,29.92,4.93,44.7,8.3,2.04,1.14,7.23,9.9,7.62,12.37.65,4.05-.48,19.12-.93,23.95-.15,1.57-.76,2.97-1.02,4.49Z"/>
        <path :style="`fill:${currentteaminfo.color2}`" class="cls-5" d="M1079.66,178.66v48h-112v-47.5l1.5-1.28c.41-.03.75.78,1,.78h109.5Z"/>
        <path :style="`fill:${currentteaminfo.color2}`" d="M965.66,210.66l-62-12.01c5.11-10.84,9.89-21.86,11.01-33.99,12.17,4.7,31.25,9.43,43.69,4.2,2.78-1.17,4.84-4.14,7.51-4.02,3.39.14,8.79,3.13,12.48,3.64l14.31,8.19h-26c.32.98-1,2.17-1,2.5v31.5Z"/>
        <path :style="`fill:${currentteaminfo.color1}`" class="cls-7" d="M132.98,43L7.17,20.83,0,0l122.28,25.21c1.85,2.11,11.73,16.49,10.7,17.79Z"/>
        <path :style="`fill:${currentteaminfo.color2}`" d="M914.66,149.66l46.01,16.49c-15.11,7.56-31.03,1.77-46.01-2.49v-14Z"/>
        <polygon :style="`fill:${currentteaminfo.color2}`" class="cls-3" points="431.16 21.66 423.66 12.67 453.05 11.6 455.66 21.66 431.16 21.66"/>
        <path :style="`fill:#434343;`" class="cls-2" d="M836.42,148.85c14.14-2.1,15.42,19.93,1.72,20.87-14.39.99-15.27-18.86-1.72-20.87Z"/>
        <circle :style="`fill:#191919;`" cx="101.56" cy="155.57" r="49.67"/>
        <path :style="`fill:#434343;`" class="cls-2" d="M100.92,145.27c14.14-2.1,15.42,19.93,1.72,20.87-14.39.99-15.27-18.86-1.72-20.87Z"/>
        <path :style="`fill:#1e1e1e;`" d="M91.16,81.6c57.7-5.9,104.68,48.63,80.06,104.06C134.65,268.04,1.53,228.56,29.42,133.87c8.14-27.65,32.7-49.3,61.73-52.27ZM138.01,117.66c-6.94-6.61-19.71-13.13-29.26-14.24-66.95-7.84-84.2,92.14-15.62,104.62,50.52,9.19,82.09-54.94,44.88-90.38Z"/>
      </svg>
      <div class="back"></div>
      <div class="base">
          <div class="teaminfo">            
            <div class="graph">

              <div class="partofgraph aero">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.aerodynamics}%`">{{ currentteaminfo.aerodynamics }}</div>
                </div>
                <div class="line"></div>
                <div class="svg"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path  d="M18.285 16.297v20.52L127.088 163.57c35.955 91.222 6.358 156.645-59.43 178.098l111.852 34.758c6.88-3.465 12.225-7.756 17.69-12.64c38.677-34.554 39.72-103.556-23.38-190.208c98.413 71.66 174.565 60.578 202.85 5.686L342.545 66.78c-21.29 65.28-86.246 95.3-176.545 60.794L36.908 16.297zM401.998 221.48c-18.06 55.37-84.184 71.942-172.205 7.846c64.098 88.022 47.94 153.736-7.432 171.79l73.095 22.714c4.504-2.256 8.003-5.05 11.566-8.252l-.002-.006c25.274-22.58 25.955-67.676-15.28-124.302c64.31 46.833 114.076 39.59 132.56 3.716L402 221.48zm41.68 114.366c-10.75 32.968-50 42.71-102.408 4.545c38.163 52.41 28.42 91.66-4.55 102.41l153.8 46.843l-46.84-153.797h-.002z"/></svg></div>          
              </div>

              <div class="partofgraph gear">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.gearbox}%`">{{ currentteaminfo.gearbox }}</div>
                </div>
                <div class="line"></div>
                <div class="svg"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>manual-transmission</title><path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.23,61.23,0,0,1,61.44,0Zm4.07,82.09a6.67,6.67,0,1,1-8.14,0V68.62H42.31V82.09a6.67,6.67,0,1,1-8.14,0V46.17a6.67,6.67,0,1,1,8.14,0V60.48H57.37V46.17a6.67,6.67,0,1,1,8.14,0V60.48H80.57V46.17a6.67,6.67,0,1,1,8.14,0V64a4.41,4.41,0,0,1,0,.52,4.07,4.07,0,0,1-4.07,4.07H65.51V82.09Zm33-57.76a52.46,52.46,0,1,0,15.38,37.11A52.29,52.29,0,0,0,98.55,24.33Z"/></svg></div>          
              </div>

              <div class="partofgraph brakes">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.brakes}%`">{{ currentteaminfo.brakes }}</div>
                </div>
                <div class="line"></div>
                <div class="svg">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 512.009 512.009" xml:space="preserve">
                    <g>
                      <g>
                       <g>
                        <path d="M277.337,256.007c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333
                          S265.561,256.007,277.337,256.007z"/>
                        <path d="M277.337,298.674c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
                          S289.113,298.674,277.337,298.674z"/>
                        <path d="M277.337,149.34c-70.683,0-128,57.317-128,128s57.317,128,128,128s128-57.317,128-128S348.02,149.34,277.337,149.34z
                          M277.337,362.674c-47.119,0-85.333-38.214-85.333-85.333s38.214-85.333,85.333-85.333s85.333,38.214,85.333,85.333
                          S324.456,362.674,277.337,362.674z"/>
                        <path d="M307.08,44.344V33.679c0-19.406-16.295-34.56-35.517-33.64C124.746,7.211,7.202,124.762,0.054,271.554
                          c-0.98,19.189,14.2,35.512,33.617,35.512h10.664c14.711,115.872,113.645,204.943,232.869,204.943
                          c129.674,0,234.795-105.128,234.795-234.816C511.999,157.967,422.95,59.046,307.08,44.344z M264.405,43.281v42.914
                          c-5.207,0.546-10.35,1.299-15.427,2.23c-60.921,11.163-111.992,49.574-140.217,102.267
                          c-11.965,22.334-19.826,47.232-22.597,73.707H43.296C53.479,146.906,146.943,53.453,264.405,43.281z M277.205,469.342
                          c-95.683,0-175.418-70.121-189.795-162.261h7.075c12.207,0,23.097-6.537,28.984-16.465c2.605-4.383,4.237-9.426,4.564-14.865
                          c1.85-30.291,12.134-58.188,28.543-81.408c22.705-32.124,57.14-55.289,97.251-63.412c7.144-1.445,14.467-2.413,21.935-2.87
                          c4.989-0.3,9.65-1.697,13.773-3.941c0.072-0.039,0.141-0.082,0.212-0.122c0.383-0.212,0.764-0.427,1.137-0.654
                          c0.252-0.153,0.497-0.317,0.745-0.476c0.188-0.121,0.38-0.237,0.565-0.361c0.316-0.212,0.623-0.435,0.931-0.658
                          c0.111-0.081,0.227-0.156,0.337-0.238c0.316-0.235,0.623-0.48,0.93-0.725c0.097-0.077,0.197-0.15,0.293-0.229
                          c0.258-0.211,0.506-0.431,0.757-0.649c0.139-0.121,0.283-0.237,0.42-0.36c0.147-0.132,0.286-0.27,0.43-0.405
                          c6.661-6.195,10.787-15.058,10.787-24.742v-7.085c92.143,14.361,162.253,94.086,162.253,189.778
                          C469.333,383.317,383.314,469.342,277.205,469.342z"/>
                        <path d="M234.67,256.007c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
                          S246.446,256.007,234.67,256.007z"/>
                        <path d="M320.004,256.007c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
                          S331.78,256.007,320.004,256.007z"/>
                      </g>
                    </g>
                  </g>
            </svg>
            </div>          
              </div>

              <div class="partofgraph rearwing">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.rearwing}%`">{{ currentteaminfo.rearwing }}</div>
                </div>
                <div class="line"></div>
                <div class="svg">
                  <!--spoiler by Izwar Muis from <a href="https://thenounproject.com/browse/icons/term/spoiler/" target="_blank" title="spoiler Icons">Noun Project</a> (CC BY 3.0)-->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 64 60" enable-background="new 0 0 64 64" xml:space="preserve"><metadata><?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        "/><?xpacket end="w"?></metadata><g><g><path d="M0.745,28.325l5,7C6.494,36.374,7.711,37,9,37c0.188,0,0.378-0.013,0.566-0.041l48.999-7    c1.683-0.24,3.033-1.557,3.356-3.247l1.11-4.95l-62.65,5.922C0.483,27.906,0.6,28.122,0.745,28.325z"/><path d="M63.048,14.409C62.286,13.514,61.175,13,60,13c-0.081,0-0.161,0.002-0.234,0.007l-52,3.05    c-1.239,0.073-2.392,0.731-3.085,1.761l-4,5.95c-0.395,0.588-0.631,1.26-0.68,1.941l63.492-5.999l0.411-1.835    C64.177,16.658,63.856,15.362,63.048,14.409z"/><path d="M5.658,45.316c-1.25,0.626-1.899,2.013-1.578,3.373C4.401,50.05,5.602,51,7,51h21c1.153,0,2.217-0.673,2.711-1.716    l6.77-14.292L14.58,38.264C10.377,42.875,5.728,45.281,5.658,45.316z M13,48c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1    S13.552,48,13,48z M25,46c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S24.448,46,25,46z"/></g></g><text x="0" y="79" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text><text x="0" y="84" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                </div>          
              </div>

              <div class="partofgraph frontwing">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.frontwing}%`">{{ currentteaminfo.frontwing }}</div>
                </div>
                <div class="line"></div>
                <div class="svg"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path  d="M384 50c-14.688 0-29.365 6.747-31.676 20.23 10.285-3.726 21.404-5.66 32.533-5.693 10.456-.03 20.915 1.62 30.696 5.01C412.873 56.517 398.44 50 384 50zm.89 32.697c-10.248.03-20.532 1.925-29.447 5.617-6.347 2.63-13.647 6.577-18.795 11.012C331.5 103.762 329 108.05 329 112v52.236l110-43.334V112c0-3.913-2.39-8.276-7.207-12.72-4.818-4.44-11.67-8.425-17.688-11.012-8.762-3.768-18.97-5.6-29.216-5.57zM494 118.582L83.895 280.14c-5.35 2.733-13.294 10.738-20.874 21.96-7.634 11.304-15.202 25.66-21.79 40.543-10.3 23.274-18.013 48.48-20.917 64.373 22.138-3.977 44.664-8.047 67.347-12.112l5.723-37.95c30.852-8.914 111.01-29.017 154.287-40.42l.28-.56.634.317C345.567 290.76 409.75 278.177 494 268.315V118.582zm0 167.834c-25.687 3.027-49.473 6.31-72.91 10.152l-35.108 52.364c38.81-4.09 75.245-6.675 108.018-7.112v-55.404zm-97.424 14.397c-41.764 7.628-84.273 17.402-136.435 31.033l-18.333 36.67c41.485-6.58 82.124-12.432 120.756-16.973l34.013-50.73zM236.94 337.99c-36.766 9.856-78.698 21.625-127.913 35.66l-2.672 17.922c37.804-6.734 75.923-13.384 113.56-19.53l17.026-34.052zm65.583 39.733a3495.754 3495.754 0 0 0-24.73 3.623L281 418h18l3.523-40.277zm-95.9 14.882a6526.23 6526.23 0 0 0-24.88 4.184L185 434h18l3.623-41.395zm-96.05 16.54c-8.267 1.467-16.535 2.932-24.762 4.402L89 450h18l3.574-40.854z"/></svg></div>          
              </div>

              <div class="partofgraph reliability">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${currentteaminfo.reliability}%`">{{ currentteaminfo.reliability }}</div>
                </div>
                <div class="line"></div>
                <div class="svg"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28.306 28.306" xml:space="preserve"><g>
                  <path  d="M12.486,8.162c0.598-2.139,0.055-4.53-1.623-6.213C9.189,0.283,6.824-0.263,4.699,0.314l3.602,3.603
                      L7.355,7.443L3.824,8.387l-3.604-3.6c-0.574,2.127-0.027,4.49,1.645,6.162c1.748,1.751,4.271,2.266,6.477,1.547l0.021,0.02
                      l14.818,14.818c0.586,0.585,1.355,0.881,2.123,0.881c0.77,0,1.535-0.296,2.123-0.881c1.172-1.17,1.172-3.069,0-4.246L12.486,8.162z
                      M25.562,26.831c-0.631,0-1.141-0.513-1.141-1.147s0.51-1.146,1.141-1.146c0.637,0,1.152,0.512,1.152,1.146
                      S26.199,26.831,25.562,26.831z"/>
                  </g>
              </svg></div>          
              </div>

              <div class="partofgraph overall">
                <div class="realgraph">
                  <div class="graphheight" :style="`height:${score(currentteaminfo.aerodynamics, currentteaminfo.gearbox, currentteaminfo.brakes, currentteaminfo.rearwing, currentteaminfo.frontwing, currentteaminfo.reliability)}%`">{{ score(currentteaminfo.aerodynamics, currentteaminfo.gearbox, currentteaminfo.brakes, currentteaminfo.rearwing, currentteaminfo.frontwing, currentteaminfo.reliability) }}</div>
                </div>
                <div class="line"></div>
                <div class="svg">
                  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                  <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="800px" height="800px" viewBox="0 0 98.751 98.75"
                    xml:space="preserve">
                  <g>
                    <g>
                      <path d="M22.106,46.936c-3.79,0-6.866,3.071-6.866,6.866c0,0.293,0.024,0.58,0.062,0.862c0.426,3.386,3.307,6.003,6.805,6.003
                        c3.598,0,6.54-2.761,6.839-6.279c0.017-0.194,0.03-0.389,0.03-0.586C28.976,50.008,25.9,46.936,22.106,46.936z M18.667,51.213
                        l1.402,1.4c-0.109,0.188-0.196,0.391-0.249,0.605h-1.975C17.947,52.469,18.234,51.789,18.667,51.213z M17.839,54.407h1.988
                        c0.057,0.212,0.139,0.412,0.25,0.598l-1.404,1.402C18.239,55.836,17.944,55.152,17.839,54.407z M21.512,58.067
                        c-0.742-0.102-1.419-0.395-1.99-0.824l1.396-1.398c0.182,0.107,0.385,0.186,0.594,0.24V58.067z M21.512,51.516
                        c-0.214,0.057-0.417,0.144-0.606,0.254l-1.396-1.398c0.573-0.438,1.256-0.726,2.003-0.83L21.512,51.516L21.512,51.516z
                        M22.701,49.542c0.751,0.104,1.433,0.393,2.007,0.831l-1.397,1.397c-0.188-0.11-0.393-0.197-0.609-0.254L22.701,49.542
                        L22.701,49.542z M22.701,58.067v-1.98c0.212-0.057,0.412-0.135,0.598-0.244l1.395,1.4C24.123,57.674,23.446,57.965,22.701,58.067z
                        M25.547,56.411l-1.407-1.408c0.107-0.185,0.198-0.382,0.255-0.596h1.972C26.263,55.152,25.982,55.84,25.547,56.411z
                        M24.395,53.219c-0.053-0.215-0.139-0.418-0.247-0.605l1.4-1.4c0.435,0.575,0.721,1.256,0.823,2.006H24.395L24.395,53.219z"/>
                      <path d="M78.029,53.801c0-3.049,1.638-5.717,4.072-7.19l-16.177-7.166H55.775c-0.604,0-1.094,0.49-1.094,1.095v1.438
                        c0,0.604,0.489,1.095,1.094,1.095h0.72v0.997h-1.841c-0.579,0-1.096,0.371-1.277,0.921L53.23,45.43
                        c-3.351-0.271-4.945,2.294-6.62,2.294l-1.131-1.361c-0.674-0.813-1.706-1.241-2.758-1.144c-0.32,0.03-0.661,0.094-1.008,0.211
                        l-0.635,2.294c0,0-5.759-0.335-13.245-0.066c1.648,1.537,2.687,3.72,2.687,6.146c0,0.24,0.039,5.32,0.039,5.32h49.383
                        c-0.976-1.188-1.637-2.648-1.84-4.266C78.055,54.485,78.029,54.135,78.029,53.801z"/>
                      <path d="M13.695,53.801c0-1.928,0.659-3.699,1.753-5.12C9.664,49.487,4.044,50.83,0,53.047c0,1.176,5.168,0.019,5.168,2.448H1.181
                        c-0.402,0-0.728,0.325-0.728,0.728v2.172c0,0.402,0.325,0.729,0.728,0.729h9.969c0.403,0,0.729-0.326,0.729-0.729v-3.354h1.922
                        c-0.009-0.062-0.024-0.121-0.032-0.185C13.72,54.485,13.695,54.135,13.695,53.801z"/>
                      <path d="M96.938,38.084H86.284c-1.003,0-1.815,0.812-1.815,1.814v2.376c0,0.48,0.191,0.942,0.531,1.282l1.855,1.854
                        c4.446,0.218,8,3.893,8,8.391c0,0.111-0.012,0.224-0.017,0.334h3.912V39.899C98.752,38.896,97.939,38.084,96.938,38.084z"/>
                      <path d="M86.74,46.936c-3.79,0-6.866,3.071-6.866,6.866c0,0.293,0.024,0.58,0.062,0.862c0.426,3.386,3.308,6.003,6.806,6.003
                        c3.598,0,6.54-2.761,6.84-6.279c0.017-0.194,0.028-0.389,0.028-0.586C93.609,50.008,90.535,46.936,86.74,46.936z M83.302,51.213
                        l1.401,1.4c-0.109,0.188-0.195,0.391-0.249,0.605h-1.976C82.581,52.469,82.868,51.789,83.302,51.213z M82.473,54.407h1.988
                        c0.057,0.212,0.139,0.412,0.25,0.598l-1.404,1.402C82.873,55.836,82.578,55.152,82.473,54.407z M86.146,58.067
                        c-0.742-0.102-1.42-0.395-1.99-0.824l1.396-1.396c0.183,0.106,0.386,0.185,0.595,0.24V58.067z M86.146,51.516
                        c-0.215,0.057-0.418,0.144-0.606,0.254l-1.396-1.398c0.572-0.438,1.256-0.726,2.004-0.83v1.975H86.146z M87.335,49.542
                        c0.751,0.104,1.433,0.393,2.007,0.831l-1.396,1.397c-0.188-0.11-0.393-0.197-0.609-0.254L87.335,49.542L87.335,49.542z
                        M87.335,58.067v-1.98c0.212-0.057,0.412-0.135,0.599-0.244l1.396,1.4C88.758,57.674,88.08,57.965,87.335,58.067z M90.182,56.411
                        l-1.408-1.408c0.107-0.185,0.199-0.382,0.256-0.596h1.972C90.896,55.152,90.616,55.84,90.182,56.411z M89.029,53.219
                        c-0.055-0.215-0.139-0.418-0.248-0.605l1.4-1.4c0.435,0.575,0.721,1.256,0.822,2.006H89.029L89.029,53.219z"/>
                    </g>
                  </g>
                  </svg>
                </div>          
              </div>
             
            </div>
            <h3 class="textinfo"><div class="underline"></div> INFORMACE </h3>
            <div class="information">
              <div class="money">Rozpočet: {{ currentteaminfo.money }} €</div>
              <div class="nationality">Národnost: <span class="fi" :class="`fi-${findteamNationality()}`" aria-hidden="true"></span> {{ findteamFullNationality(currentteaminfo.nationality) }}</div>
              <h4>Jezdci:
                <div class="driver driver1"><span class="fi" :class="`fi-${getdriver(4)}`" aria-hidden="true"></span>  {{ getdriver(1) }} <div v-html="getdriver(7)"></div></div>
                <div class="driver driver2"><span class="fi" :class="`fi-${getdriver(5)}`" aria-hidden="true"></span>  {{ getdriver(2) }} <div v-html="getdriver(8)"></div></div>
                <div class="driver testdriver"><span class="fi" :class="`fi-${getdriver(6)}`" aria-hidden="true"></span>  {{ getdriver(3) }} <div v-html="getdriver(9)"></div></div>
              </h4>
              <div class="driverpolitics">Jezdecká politika: {{ driverpol(currentteaminfo.driverpolitics) }}</div>
              <h4>sponzoři:
                <div class="sponzor sp1"><span class="fi" :class="`fi-${findsponzornationality(currentteaminfo.sponzor1) }`" aria-hidden="true"></span> {{ findsponzor(currentteaminfo.sponzor1) }} <span>{{ findsponzormoney(currentteaminfo.sponzor1) }} €</span></div>
                <div class="sponzor sp2"><span class="fi" :class="`fi-${findsponzornationality(currentteaminfo.sponzor2) }`" aria-hidden="true"></span> {{ findsponzor(currentteaminfo.sponzor2) }} <span>{{ findsponzormoney(currentteaminfo.sponzor2) }} €</span></div>
                <div class="sponzor sp3"><span class="fi" :class="`fi-${findsponzornationality(currentteaminfo.sponzor3) }`" aria-hidden="true"></span> {{ findsponzor(currentteaminfo.sponzor3) }} <span>{{ findsponzormoney(currentteaminfo.sponzor3) }} €</span></div>
              </h4>
             
              
              
              
            </div>
              
          </div>
          <div class="cuplogo">
            <img src="/images/logo/championships/01.svg" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
//variables
const sound = useClickSound(); 
const sound2 = useClickSoundNext();
let teams = ref([]);
let drivers = ref([]);
let logos = ref([]);
logos.value = await $fetch("/api/listlogo");
teams.value = await $fetch("/api/listTeam");
drivers.value = await $fetch("/api/listDriver");
let currentteamindex = ref(0); 
import sponzors from '~/assets/json/sponzors.json'
import sponzorsmoney from '~/assets/json/sponzorsmoney.json'
import sponzorsnationality from '~/assets/json/sponzorsnation.json'
import nationality from '~/assets/json/nationality.json'
let currentteaminfo = computed(() => teams.value[currentteamindex.value] || {});

console.log(drivers)
console.log(teams.value[0].gearbox);
function getRoadById(id)  {
  return logos.value[id].road;
}

function findsponzor(num) {
   return sponzors[num.toString()] 
}

function findsponzormoney(num) {
  return sponzorsmoney[num.toString()] 
}

function findsponzornationality(num) {
   return (sponzorsnationality[num.toString()] || '').toLowerCase();
}
function score(num1, num2, num3, num4, num5, num6) {
   return Math.round(((num1 + num2 + num3 + num4 + num5 + num6) / 600) * 100)
}
function findteamNationality() {
    return currentteaminfo.value.nationality;
  }
function findteamFullNationality(nationalityCode) {
  const upperCode = nationalityCode ? nationalityCode.toUpperCase() : '';
  return nationality[upperCode] || "Neznámá národnost";
}

function getdriver(num) { 
   const findDriverById = (driverId) => {
    for(let i = 0; i < drivers.value.length; i++) {
      if(drivers.value[i].ID == driverId) {
        return drivers.value[i].name;
      }
    }
    return "NULL"; 
  }
  const findDriveNationalityID = (driverId) => {
    for(let i = 0; i < drivers.value.length; i++) {
      if(drivers.value[i].ID == driverId) {
        return drivers.value[i].nationality.toLowerCase().trim();
      
      }
    }
    return "NULL"; 
  }

  const findDriverAbilities = (driverId) => {
    for(let i = 0; i < drivers.value.length; i++) {
      if(drivers.value[i].ID == driverId) {
        let abilitiescounter = drivers.value[i].racestart + drivers.value[i].concentration + drivers.value[i].overtaking + drivers.value[i].experience + drivers.value[i].quickness + drivers.value[i].stamina;
        let scaledRating = Math.round(abilitiescounter / 60)
        let html = ''
        for (let i = 0; i < 5; i++) {
          if (scaledRating > 1) {
            html += '<div class="css-star"></div>'           
          } else if (scaledRating == 1) {
            html += '<div class="css-star half-star"></div>'
          } else {
            html += '<div class="css-star empty"></div>'
          }
          console.log(scaledRating)
          scaledRating -=2;
        }
        return html;
      }
    }
     
    return "NULL"; 
  }
  switch(num) {
    case 1: 
      return findDriverById(currentteaminfo.value.driver1);
    case 2: 
      return findDriverById(currentteaminfo.value.driver2);
    case 3: 
      return findDriverById(currentteaminfo.value.testdriver);
    case 4:
      return findDriveNationalityID(currentteaminfo.value.driver1);
    case 5:
      return findDriveNationalityID(currentteaminfo.value.driver2);
    case 6:
      return findDriveNationalityID(currentteaminfo.value.testdriver);
     case 7:
      return findDriverAbilities(currentteaminfo.value.driver1);
    case 8:
      return findDriverAbilities(currentteaminfo.value.driver2);
    case 9:
      return findDriverAbilities(currentteaminfo.value.testdriver);
    default:
      return "ERROR";
  }
 
}

function driverpol(num) {
  if(num == 1) {
    return "Jasná jednička"
  } else {
    return "pro všechny stejně"
  }
}


function leftclick() {
  sound2.play()
  if(currentteamindex.value <= 0) {
    currentteamindex.value = 10 - 1;
  } else {
    currentteamindex.value -= 1;
  }
}

function rightclick() {
  sound2.play()
  if(currentteamindex.value >= 10- 1) {
    currentteamindex.value = 0;
  } else {
    currentteamindex.value += 1;
  }
}


//API

const { updateManager  } = useManagerApi();
const message = ref('');

const updateCurrentManager = async (newData) => {
  try {
    await updateManager(newData);
  } catch (error) {
  } finally {
  }
};

const editManager = async () => {
  const newData = {
    team: currentteamindex.value + 1, 
  };
  await updateCurrentManager(newData);
};
//layout 

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('teams') 
})




const switchToDefaut = () => {
  sound.play()
  editManager()
  navigateTo('menu/menu')
}

</script>
<style scoped>
.dynamic-svg path,
.dynamic-svg circle, 
.dynamic-svg rect {
  stroke: var(--team-color);
  stroke-width: 2;
  fill: currentColor;
}
</style>
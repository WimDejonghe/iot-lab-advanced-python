import { containerPlugin } from '@vuepress/plugin-container'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

module.exports = {
  lang: 'en-US',
  title: 'VIVES IoT Lab Advanced',
  description: 'Cursus voor Graduaat studenten Internet Of Things VIVES Kortrijk',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?familiy=Material+Icons' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML', async: true }]
  ],
  //extendsMarkdown: md => { md.use(require('markdown-it-mathjax3')); },

  theme: defaultTheme({
    logo: 'https://www.vives.be/sites/default/files/uploads/huisstijl/Logo VIVES Hogeschool - Smile.png',
    navbar: [

      { text: 'Toledo', link: 'https://toledo.kuleuven.be/portal' },
      { text: 'Report Issue', link: 'https://github.com/WimDejonghe/iot-lab-advanced/issues' },
      { text: 'Organization', link: 'https://github.com/WimDejonghe/iot-lab-advanced' }
    ],
    sidebar: [
      {
        text: 'About this Course',
        link: '/about-this-course/README.md',
      },
      {
        text: 'Zeven segment display',
        children: [
          '/a-zevensegment/01-display/README.md',
          '/a-zevensegment/02-schema/README.md',
          '/a-zevensegment/03-flowchart/README.md',
          '/a-zevensegment/04-programma/README.md',
        ]
      },
      {
        text: 'Methoden',
        children: [
          '/b-methoden/01-methode_zonder/README.md',
          '/b-methoden/02-methode_met/README.md',
          '/b-methoden/03-methode_return/README.md',
          
        ]
      },
      {
        text: 'BCD naar 7segment converter',
        children: [
          '/c-driver/01-4511/README.md',  
          '/c-driver/02-schema/README.md', 
          '/c-driver/03-werking/README.md',  
          '/c-driver/04-flowchart/README.md', 
          '/c-driver/05-programma/README.md',               
        ]
      },
      {
        text: 'Parallelle communicatie',
        children: [
          '/d-parallel/01-pvs/README.md',  
          '/d-parallel/02-lcd/README.md', 
          '/d-parallel/03-opdracht/README.md',              
        ]
      },
      {
        text: 'Interrupts',
        children: [
          '/e-interrupt/01-polling/README.md',  
          '/e-interrupt/02-interrupt/README.md', 
          '/e-interrupt/03-hardware/README.md',
          '/e-interrupt/04-voorbeeld/README.md',  
          '/e-interrupt/05-opdracht/README.md',            
        ]
      },
      {
        text: 'Timers',
        children: [
          '/f-timer/01-millis/README.md',  
          '/f-timer/02-hardware_timer/README.md', 
                      
        ]
      },

      {
        text: 'Dender effect',
        children: [
          '/g-dender/01-dender/README.md',  
          '/g-dender/02-hardware/README.md', 
          '/g-dender/03-software/README.md', 
          '/g-dender/04-opdracht/README.md', 
                      
        ]
      },

      {
        text: 'Seriële communicatie',
        children: [
          '/h-serial/01-aansluiting/README.md',  
          '/h-serial/02-connector/README.md', 
          '/h-serial/03-rs232/README.md', 
          '/h-serial/04-ttl/README.md', 
          '/h-serial/05-serial/README.md', 
          '/h-serial/06-fout/README.md',     
          '/h-serial/07-esp32/README.md', 
          '/h-serial/08-terminal/README.md',  
          '/h-serial/09-voorbeeld/README.md', 
          '/h-serial/10-opdracht/README.md',           
        ]
      },

      {
        text: 'I²C',
        children: [
          '/i-i2c/01-i2c/README.md',  
          '/i-i2c/02-esp32/README.md',  
          '/i-i2c/03-pcf8574/README.md',   
          '/i-i2c/04-DS1621/README.md',  
        ]
      },
      {
        text: 'SPI',
        children: [
          '/j-spi/01-spi/README.md',  
          '/j-spi/02-esp/README.md',  
          '/j-spi/03-mcp/README.md', 
          '/j-spi/04-leds/README.md',  
           
        ]
      },
     
    ],
    sidebarDepth: 1,
    repo: 'WimDejonghe/iot-lab-advanced',
    docsDir: 'docs',
    docsBranch: 'main'
  }),
  serviceWorker: true,
  plugins: [
    containerPlugin({
      type: 'codeoutput',
      locales: {
        '/': {
          defaultInfo: 'Output',
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    
  ],
}
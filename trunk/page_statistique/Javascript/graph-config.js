//la creation du graph , modifier son style,type... ,modifier ses données
hover_effect="0.7"

bg_color=["rgb(255,255,255)"]
text_color=["rgb(0,0,0)"]

color_bar=['rgb(0, 63, 92)']
color_bar_hover=[`rgb(0,63,92,${hover_effect})`]

border_color_line=['rgb(255, 99, 132)']
color_line=['rgb(255, 200, 200)']
color_line_hover=[`rgb(255, 99, 132,${hover_effect})`]

color_pie=["rgb(0, 63, 92)","rgb(249, 93, 106)","rgb(47, 75, 124)","rgb(102, 81, 145)","rgb(160, 81, 149)","rgb(212, 80, 135)","rgb(255, 124, 67)","rgb(255, 166, 0)"]
color_pie_hover=[`rgb(0, 63, 92,${hover_effect})`,`rgb(249, 93, 106,${hover_effect})`,`rgb(47, 75, 124,${hover_effect})`,`rgb(102, 81, 145,${hover_effect})`,`rgb(160, 81, 149,${hover_effect})`,`rgb(212, 80, 135,${hover_effect})`,`rgb(255, 124, 67,${hover_effect})`,`rgb(255, 166, 0,${hover_effect})`]
border_color_bar_pie=["rgb(255,255,255)"]


var facets=["datetime","reg_name","dep_name","atm","sexe","an_nais","grav","lum"]



var titlesExemple=["nombre d'accident par année ","nombre d'accident par région ","nombre d'accicent par département","nombre d'accident par conditions métérologique ","nombre de personnes accidentées par sexe ","nombre de personnes accidentées  par tranche d'age ","nombre de personnes accidentées par gravité de l'accident ","nombre d'accident jour/nuit "] //titre des graphs (exemple par default)

var titles=[]

const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

var configLine={   //une configuration par default pour representer le nombre d'accident par année
    type: 'line',
    data: {
        labels:[],
        datasets: [{
            label: "nombre d'accident par année",
            borderColor: border_color_line,
            borderWidth: 1,
            fill: false,
            data:[],
        }]
    },
    options: {
        
        maintainAspectRatio: false,
        plugins: {
            customCanvasBackgroundColor: {
                color: bg_color,
            },
            title: {
                display: true,
                text: "nombre d'accident par année",
                color:text_color,
                font:{
                    size:20
                }
            },
            legend:{
                labels:{
                    color:text_color,
                    font:{
                        size:15
                    }
                }
            }
        },
        scales:{
            y:{
                beginAtZero:true,
               
            },
            x:{
                beginAtZero:true,
               
            },
        },
    },
    plugins:[plugin]
} 


function updateTitles(){  //mettre a jour le titre du graph 
    titles=[]
    for(var i=0;i<facets.length;i++){
        if(inputValueX==facets[i]){
            titles[0]=titlesExemple[i]
        }
    }

    if(inputLieu && inputLieu!="tous-les-lieus"){
        titles[0]+=inputLieu+" "
        if(!inputAnneeGraph || inputAnneeGraph=="toutes-les-annees"){
            titles[0]+=listAnneeLieu[0].name+"-"+listAnneeLieu[listAnneeLieu.length-1].name
        }
    }
    else{
        titles[0]+="France "
    }

    if(inputAnneeGraph && inputAnneeGraph!="toutes-les-annees"){
        titles[0]+=inputAnneeGraph+" "

    }

}



function selectData(){  //mettre a jour les données du graph

    chart.data.labels=label
    chart.data.datasets[0].data=datas
    chart.options.plugins.title.text=titles
    chart.update()
    

}

function selectColonne(inputChart){ //changer  le type de graph
    
    if(inputChart=="colonne" || typeChart=="colonne"){ //type de graph par defaut ou changer le type des graph par le filtre colonne
        
        configColonne() 

        if(!typeChart){  // on change l'afichage du filtre colonne si l'utilisateur n'a pas utiliser le filtre colonne 
            colonneSelect[0].innerHTML="colonne"
            colonneSelect[1].innerHTML="courbe"
            colonneSelect[2].innerHTML="camembert"
            colonneSelect[0].value="colonne"
            colonneSelect[1].value="courbe"
            colonneSelect[2].value="camembert"
        }

    }

    else if(inputChart=="camembert" || typeChart=="camembert"){
        
        configCamembert()
        if(!typeChart){
            colonneSelect[0].innerHTML="camembert"
            colonneSelect[1].innerHTML="colonne"
            colonneSelect[2].innerHTML="courbe"
            colonneSelect[0].value="camembert"
            colonneSelect[1].value="colonne"
            colonneSelect[2].value="courbe"
        }
  
    }

    else if(inputChart=="courbe" || typeChart=="courbe"){ 
        //chart=courbe()
        configCourbe()
        if(!typeChart){
            colonneSelect[0].innerHTML="courbe"
            colonneSelect[1].innerHTML="camembert"
            colonneSelect[2].innerHTML="colonne"
            colonneSelect[0].value="courbe"
            colonneSelect[1].value="camembert"
            colonneSelect[2].value="colonne"
        }
    }

    
    
}

function configCamembert(){   // la config de chaque type de graph
    chart.config.type="pie"
    chart.options.scales.x.display=false
    chart.options.scales.y.display=false
    chart.data.datasets[0].backgroundColor=color_pie
    chart.data.datasets[0].borderColor=border_color_bar_pie
    chart.data.datasets[0].hoverBackgroundColor=color_pie_hover
    chart.update()    
}

function configColonne(){

    chart.config.type="bar"  //mettre a jour le type de graph
    chart.options.scales.x.display=true
    chart.options.scales.y.display=true
    chart.data.datasets[0].backgroundColor=color_bar
    chart.data.datasets[0].borderColor=border_color_bar_pie
    chart.data.datasets[0].hoverBackgroundColor=color_bar_hover
    
    chart.update() 
}

function configCourbe(){
    chart.config.type="line"
    chart.options.scales.x.display=true
    chart.options.scales.y.display=true
    chart.data.datasets[0].borderColor=border_color_line
    chart.data.datasets[0].backgroundColor=color_line
    chart.data.datasets[0].hoverBackgroundColor=color_line_hover
    chart.data.datasets[0].pointHoverRadius=6
    chart.update()
}

function courbe(){  //generer la courbe avec les données de années
    var chart =new Chart(canvas, configLine);
    chart.data.labels=label[0]
    chart.data.datasets[0].data=datas[0]
    chart.update()
    return chart
}


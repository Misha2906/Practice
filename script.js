var app = new Vue({
    el:".garlic_img, .Tomato_one_main_content, .Contact_us_main_content",
    data:{
        store_name:"Agridera Fresh Market Garlics Hybrids",
        products:
        [{
            id:"garlic_1", 
            title:"TAG 1000 (TAG 853)",
            short_text:'Garlic Determinate White Standard Round',
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"garlic_1.png",            
        },
        {   id:"garlic_2", 
            title:"TAG 1001 (TAG 855)", 
            short_text:'Garlic Determinate Red Standard Round', 
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"garlic_2.png",
            
        },    
        {   
            id:"garlic_3", 
            title:"TAG 1002 (TAG 809)", 
            short_text:'Garlic Determinate Red Standard Round', 
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"garlic_3.png",
            
        },
      ],
        product:[], 
        card: [],   
        contactFields: [],
        items: [],
        order: 0,
        btnVisible: false,  
        showModal: false,
        editedItem: null,
},   
mounted:function(){
    this.getProduct();
    this.checkInCard();
    this.getCard();


},

//     mounted:function(){
//         console.log(window.localStorage.getItem('prod'));
//     },
//     methods:{
//         addItem:function(id) {
//             window.localStorage.setItem('prod', id);
//         }
//     }
methods:{
    getProduct:function(){
        if(window.location.hash){
            var id = window.location.hash.replace('#','');
            if(this.products && this.products.length>0){
                for(i in this.products){
                    if(this.products[i] && this.products[i] && id == this.products[i].id) this.product=this.products[i];
                }
            }
        }

    },
   addToCard:function(id){
    var card = [];
    if(window.localStorage.getItem('card')){
        card = window.localStorage.getItem('card').split(',');
    }

    if(card.indexOf(String(id))){
        card.push(id);
        window.localStorage.setItem('card',card.join());
        this.btnVisible=true;
    }
    },
    checkInCard:function(){
        if(this.product && this.product.id && window.localStorage.getItem('card')
        .split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=true;
        
    },
    getCard() {
        if (window.localStorage.getItem("card") != null) {
          if (this.products != null && this.products.length > 0) {
            for (let i in this.products) {
              if (
                this.products[i] != null &&
                this.products[i].id != null &&
                window.localStorage
                  .getItem("card")
                  .split(",")
                  .indexOf(String(this.products[i].id)) != -1
              )
                this.card.push(this.products[i]);
            }
          }
        }
      },
      removeFromCard(id) {
        if (confirm('Вы точно хотите удалить данный продукт?')) {         
          this.card = this.card.filter(card => card.id !== id);
          
          let card = [];
          if (window.localStorage.getItem("card") != null) {
            card = window.localStorage.getItem("card").split(",");
          }
          if (card.indexOf(String(id)) != -1) {
            card.splice(card.indexOf(String(id)), 1);
            window.localStorage.setItem("card", card.join(","));
          }
          this.getcard();
        }
      },
      
      // removeFromCard(id) {
      //    let card = [];
      //    if (confirm('Вы точно хотите удалить данный продукт?')) {         
      //     this.card = this.card.filter(card => card.id !== id)
      //     this.card.splice(index, 1);
      //   } 
        
      //     if (window.localStorage.getItem("card") != null) {
      //       card = window.localStorage.getItem("card").split(",");
      //     }
          
      
      //     if (card.indexOf(String(id)) != -1) {
      //       card.splice(card.indexOf(String(id)), 1);
      //       window.localStorage.setItem("card", card.join(","));
      //       this.card = [];
      //       this.getcard();

      //     }
      //  },   
      
}});

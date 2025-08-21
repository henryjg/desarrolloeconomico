// export class Spin{


    
//     static load(){
//         var modal = document.getElementById("myModalSpin");
//         modal.style.display = "block";
//     }

//     static unload(){
//         var modal = document.getElementById("myModalSpin");
//         modal.style.display = "none";
//     }
// }

// spin.js
export const Spin = {
    load: function () {
        document.getElementById("spin").style.display = "block";
    },
    unload: function () {
        document.getElementById("spin").style.display = "none";
    }
};
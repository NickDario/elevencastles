/**
 * Created by ndario on 6/28/15.
 */

define(function(){

    var Gene = function(config){
        this.type = 'gene';
        this.name = config['name'] != null ? config['name'] : 'bGene'; //  Identifier for Gene
        this.val  = config['val'] != null ? config['val'] : 1;       //  Value of Gene
        this.mr  = config['mr'] != null ? config['mr'] : 2;          //  Mutation Rate
        this.ms = config['ms'] != null ? config['ms'] : 1;      //  Mutation Step
        this.minv = config['minv'] != null ? config['minv'] : 0.1;
        this.maxv = config['maxv'] != null ? config['maxv'] : null;
    };

    Gene.constructor = Gene;
    Gene.prototype = {

        mutate : function(){
            var seed = Math.random() * this.mr;
            if( seed <= this.mr * 0.2) {
                this.val += this.ms;
            } else if(seed >= this.mr * 0.8) {
                this.val -= this.ms;
            }
            if(this.minv != null && this.val <= this.minv) {
                this.val = this.minv;
            }
            if(this.maxv != null && this.val >= this.maxv) {
                this.val = this.maxv;
            }
        },

        replicate:function(){
            var seed = Math.floor(Math.random() * this.mr);
            var nVal;
            if( seed == this.mr * 0.2) {
                nVal = this.val + this.ms;
            } else if(seed == this.mr * 0.8){
                nVal = this.val - this.ms;
            }

            return new Gene({
                name  : this.name,
                minv : this.minv,
                ms   : this.ms,
                val  : nVal
            });
        }
    };

    return Gene;
});
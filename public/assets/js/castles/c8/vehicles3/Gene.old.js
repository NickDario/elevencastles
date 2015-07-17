/**
 * Created by ndario on 6/9/15.
 */

/**
 * Traits that continue are reinforced
 */

define(function(){

    var Gene = function(config){
        this.name = config['name'] != null ? config['name'] : 'bGene';  //  Identifier for Gene
        this.val  = config['nVal'] != null ? config['nVal'] : 1;      //  Value of Gene
        this.mr  = config['nMr'] != null ? config['nMr'] : 10;      //  Mutation Rate
        this.var = config['nVar'] != null ? config['nVar'] : 0.1;      //  Mutation Rate
        //this.var  = config['nVar']  != null ? config['nVar'] : 1;        //  Max reproduction target.
        //this.inv  = config['nInv']  != null ? config['nInv'] : 1;        //  Min reproduction target.
        //this.maxi = config['nMaxi'] != null ? config['nMaxi'] : 1;       //  Max reproduction value.
        //this.mini = config['nMini'] != null ? config['nMini'] : 0;       //  Min reproduction value.

        /*

            //  Sidelined

            A Gene has a VALUE that determines how potent it is.
            Genes can be REPRODUCED
            When a gene REPRODUCES, its value changes slightly.
            When reproducing, a gene has a REPRODUCTION ERROR.
            This REPRODUCTION ERROR is added to the value of the gene (the reproduction error can be negative)
            A genes value can only shift by so much before it is "caught".
            The maximum value it can shift to is MAXI
            the minimum value it can shift to is MINI
            There are Three cases during reproduction.

            mini < value < maxi : mini ++, maxi -- , the target range shrinks
            value < mini < maxi : mini -= (mini - value), value = mini, the target area grows into lower values.
            mini < maxi < value : maxi += (maxi + value), value = maxi, the target area grows into higher values.

            This is CONTINUATION, a gene will never change more than its target range will allow.
            When a gene stays consistent within a region, the region cements itself further.

            The VARIATION determines the range of the reproduction error.


         */
    };

    Gene.constructor = Gene;
    Gene.prototype = {

        mutate : function(){
            var seed = Math.floor(Math.random() * this.mr);
            if( seed == Math.floor(this.mr * 0.2)) {
                this.val += this.var;
            } else if(seed == Math.floor(this.mr * 0.8)){
                this.val -= this.var;
            }
        },

        replicate:function(){
            //var nVal, nVar, nInv, nMaxi, nMini;
            //
            ////  reproduction coefficient
            //var rc = this.var / this.inv;
            //
            //var reproduction_err = (2*rc*Math.random()) - rc;
            //
            //nVar = this.var + reproduction_err;
            //nInv = this.inv + reproduction_err;
            //
            //nVal = this.val + reproduction_err;
            //
            //if(nVal > this.maxi){
            //    var shift = nVal - this.maxi;
            //    nMaxi = this.maxi + shift;
            //    nVal = this.maxi;
            //} else if(nVal < this.mini) {
            //    var shift = this.mini - nVal;
            //    nMini = this.mini - shift;
            //    nVal = this.mini;
            //} else {
            //    nMini = this.mini + this.var;
            //    nMaxi = this.maxi + this.var;
            //}
            //
            //return new Gene({
            //    name  : this.name,
            //    nVal  : nVal,
            //    nVar  : nVar,
            //    nInv  : nInv,
            //    nMaxi : nMaxi,
            //    nMini : nMini
            //});

            var seed = Math.floor(Math.random() * this.mr);
            var nVal;
            if( seed == Math.floor(this.mr * 0.2)) {
                nVal = this.val + this.var;
            } else if(seed == Math.floor(this.mr * 0.8)){
                nVal = this.val - this.var;
            }

            return new Gene({
                name  : this.name,
                nVal  : nVal
            });
        }
    };

    return Gene;

});
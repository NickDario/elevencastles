/**
 * Created by ndario on 6/28/15.
 */


define(
['c8/vehicles4/Gene'],
function(Gene){

    var Genome = function(genes)
    {
        this.type = 'genome';
        this.genes = {};
        for(var t in genes) {
            if(typeof genes[t] == 'object') {
                if(genes[t].type == 'genome') {
                    this.genes[t] = new Genome(genes[t].genes)
                } else {
                    this.genes[t] = new Gene(genes[t]);
                }
            } else {
                this.genes[t] = new Gene({
                    name: t,
                    val: genes[t]
                });
            }
        }

        return this;
    };

    Genome.constructor = Genome;
    Genome.prototype.addGenes = function(traits) {
        for(var t in traits){
            if(typeof traits[t] == 'object') {
                if(traits[t].type == 'genome') {
                    this.genes[t] = new Genome(traits[t].genes);
                } else {
                    this.genes[t] = new Gene(traits[t]);
                }
            } else {
                this.genes[t] = new Gene({
                    name: t,
                    val: traits[t]
                });
            }
        }
    };

    Genome.prototype.getGene = function(gene) {
        return this.genes[gene] != null ? this.genes[gene].val : 0;
    };

    Genome.prototype.setGene = function(gene, val) {
      if(this.genes[gene].maxv != null && val > this.genes[gene].maxv) {
        val = this.genes[gene].maxv;
      } else if(this.genes[gene].minv && val < this.genes[gene].minv) {
        val = this.genes[gene].minv;
      }
      this.genes[gene].val = val;
    };

    Genome.prototype.mutate = function() {
        for(var i in this.genes){
            this.genes[i].mutate();
        }
    };

    Genome.prototype.replicateGenome = function() {
        var g = new Genome(this.genes);
        g.mutate();
        return g;
    };

    Genome.prototype.copyGenome = function(){
      return new Genome(this.genes);
    }

    return Genome;
});


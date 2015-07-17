/**
 * Created by ndario on 5/16/15.
 */

define(
['c8/Neuron', 'c8/Connector'],
function(Neuron, Connector)
{

    var Core = function(options)
    {
        this.n_count = options['n_count'] != null ? options['n_count'] : 256;
        this.o_count = options['o_count'] != null ? options['o_count'] : 256;



        this.neurons    = [];
        for(var j = this.o_count; j--;) {
            this.neurons[i] = new Neuron();
        }


    };

    Core.prototype.input = function(value)
    {

    }

});

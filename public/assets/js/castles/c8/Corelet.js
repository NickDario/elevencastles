/**
 * Created by ndario on 5/16/15.
 */

define(['c8/Neuron', 'c8/Core', 'c8/Connector'], function(Neuron, Core, Connector){

    var Corelet = function(options)
    {
        this._inputCount = options['inputCount'] != null ? options['inputCount'] : 256;
        this._outputCount = options['outputCount'] != null ? options['outputCount'] : 256;

        this.input = new Connector({
            pins : this._inputCount
        });

        this.output = new Connector({
            pins : this._outputCount
        });
    };

    /**
     *
     * @param inputs
     * {name : value}
     */
    Corelet.prototype.spike = function(inputs)
    {
        this.input.spike(inputs);
    }


});

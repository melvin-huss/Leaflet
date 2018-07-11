import { ImageOverlay } from './ImageOverlay';
import * as DomUtil from '../dom/DomUtil';
import * as Util from '../core/Util';

/*
 * @class CanvasOverlay
 * @aka L.CanvasOverlay
 * @inherits ImageOverlay
 *
 * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
 *
 * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
 * HTML5 element.
 *
 * @example
 *
 * ```js
 * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
 * 	videoBounds = [[ 32, -130], [ 13, -100]];
 * L.canvasOverlay(videoUrl, videoBounds ).addTo(map);
 * ```
 */

export var CanvasOverlay = ImageOverlay.extend({

    // @section
    // @aka CanvasOverlay options
    options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        autoplay: true,

        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: true
    },

    _initImage: function () {
        var wasElementSupplied = this._url.tagName === 'CANVAS';
        var vid = this._image = wasElementSupplied ? this._url : DomUtil.create('canvas');

        DomUtil.addClass(vid, 'leaflet-image-layer');
        if (this._zoomAnimated) { DomUtil.addClass(vid, 'leaflet-zoom-animated'); }

        vid.onselectstart = Util.falseFn;
        vid.onmousemove = Util.falseFn;

        // @event load: Event
        // Fired when the video has finished loading the first frame
        this.fire(this, 'load');

        if (wasElementSupplied) {
            var sourceElements = vid.getElementsByTagName('source');
            var sources = [];
            for (var j = 0; j < sourceElements.length; j++) {
                sources.push(sourceElements[j].src);
            }

            this._url = (sourceElements.length > 0) ? sources : [vid.src];
            return;
        }

        if (!Util.isArray(this._url)) { this._url = [this._url]; }

        //vid.autoplay = !!this.options.autoplay;
        //vid.loop = !!this.options.loop;
        //for (var i = 0; i < this._url.length; i++) {
        //    var source = DomUtil.create('source');
        //    source.src = this._url[i];
        //    vid.appendChild(source);
        //}
    }

    // @method getElement(): HTMLVideoElement
    // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
    // used by this overlay.
});


// @factory L.canvasOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: CanvasOverlay options)
// Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
// geographical bounds it is tied to.

export function canvasOverlay(canvas, bounds, options) {
    return new CanvasOverlay(canvas, bounds, options);
}
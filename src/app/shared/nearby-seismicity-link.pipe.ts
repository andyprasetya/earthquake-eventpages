import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';


/**
 * Returns the link to the nearbyseismicity map
 */
@Pipe({
  name: 'nearbySeismicityLink'
})
export class NearbySeismicityLinkPipe implements PipeTransform {


  private KM_PER_DEGREE = 111.12;


  transform (event: Event): string {
    if (!event || !event.geometry || !event.id) {
      return null;
    } else {
      return this.getNearbySeismicityLink(event);
    }
  }

  /**
   * Helper function
   * @param {Event} event
   * @returns {any}
   */
  getNearbySeismicityLink (event: Event) {
    if (event && event.geometry && event.id) {
      return this.getLatestEarthquakesLink(event.id,
        this.getNearbySeismicityParams(event));
    }
    // TODO: return generic link back to home page
    return null;
  }

  /**
   * Returns the link based on parameters
   * @param {string} eventid
   * @param params
   * @returns {string}
   */
  getLatestEarthquakesLink (eventid: string = null, params: any = {}) {
    const id = eventid || ('' + new Date().getTime());
    const mapPosition = this.getMapPosition(params);

    const settings = {
      autoUpdate: false,
      basemap: 'terrain',
      event: eventid,
      feed: id,
      mapposition: mapPosition,
      search: {
        id: id,
        isSearch: true,
        name: 'Search Results',
        params: params
      }
    };

    return '/earthquakes/map/#' + encodeURIComponent(JSON.stringify(settings));
  }

  /**
   * Returns the map coordinates
   * @param params
   * @returns {((any | any)[] | (any | any)[])[]}
   */
  getMapPosition (params: any = {}) {
    let latitude,
      longitude,
      maxLatitude,
      maxLongitude,
      maxRadiusKm,
      minLatitude,
      minLongitude,
      radiusDegrees;

    maxLatitude = params.maxlatitude || 85;
    maxLongitude = params.maxlongitude || 180;
    minLatitude = params.minlatitude || -85;
    minLongitude = params.minlongitude || -180;

    latitude = params.latitude;
    longitude = params.longitude;
    maxRadiusKm = params.maxradiuskm;

    if ((latitude || latitude === 0) &&
      (longitude || longitude === 0) &&
      (maxRadiusKm || maxRadiusKm === 0)) {
      radiusDegrees = maxRadiusKm / this.KM_PER_DEGREE;
      maxLatitude = latitude + radiusDegrees;
      maxLongitude = longitude + radiusDegrees;
      minLatitude = latitude - radiusDegrees;
      minLongitude = longitude - radiusDegrees;
    }

    return [
      [minLatitude, minLongitude],
      [maxLatitude, maxLongitude]
    ];
  }

  /**
   * Builds parameters based on the event
   * @param {Event} event
   * @returns {any}
   */
  getNearbySeismicityParams (event: Event) {
    let minmagnitude, time;

    const latitude = event.geometry.coordinates[1];
    const longitude = event.geometry.coordinates[0];
    const magnitude = event.properties.mag;

    time = event.properties.time;

    if (typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      typeof time !== 'number') {
      return false; // TODO :: return {} ???
    }

    time = new Date(time).getTime();

    minmagnitude = 1;
    if (magnitude !== null) {
      minmagnitude = Math.max(Math.floor(magnitude) - 3, 1);
    }

    const threeWeeks = 3 * 7 * 24 * 60 * 60 * 1000;
    const starttime = new Date(time - threeWeeks).toISOString();
    const endtime = new Date(time + threeWeeks).toISOString();

    return {
      endtime: endtime,
      latitude: latitude,
      longitude: longitude,
      maxradiuskm: 250, // TODO :: Scale this by magnitude ?
      minmagnitude: minmagnitude,
      starttime: starttime
    };
  }

}

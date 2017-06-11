/**
 * Created by jrit on 09.06.2017.
 */

//Noch in Arbeit!!!! Nur schonmal für die Struktur angelegt, funktioniell noch kein Mehrwert

import template from './view-map.template.html';
import UserService from './../../services/user/user.service';


class ViewMapComponent {
    constructor() {

        this.template = template;
        this.controller= ViewMapController;
    }

    static get name() {
        return 'viewMap';
    }
}

class ViewMapController {

}

export default ViewMapComponent;


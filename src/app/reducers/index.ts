import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromQuote from './quote.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment.prod';


export interface State {
    quote: fromQuote.State;  
};

const initialState: State = {
    quote: fromQuote.initialState,
};

const reducsers = {
    quote : fromQuote.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducsers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers(reducsers));

export function reducer(state = initialState, action: {type: string, payload: any}): State {
   return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}


@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        // offer some functions for plugin in chrome
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {}
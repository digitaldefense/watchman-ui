import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OverlayRef } from '../core';
import { FlSnackbarComponent } from './snackbar.component';

export class FlSnackbarRef<T> {
    private _instance: T;

    get instance(): T {
        return this._instance;
    }

    private _afterClosed: Subject<any> = new Subject();

    private _afterOpened: Subject<any>;

    private _onAction: Subject<any> = new Subject();

    containerInstance: FlSnackbarComponent;

    constructor(instance: T, containerInstance: FlSnackbarComponent, private _overlayRef: OverlayRef) {
        // Sets the readonly instance of the snack bar content component.
        this._instance = instance;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(() => this.dismiss());
        containerInstance._onExit().subscribe(() => this._finishDismiss());
    }

    /** Dismisses the snack bar. */
    dismiss(): void {
        if (!this._afterClosed.closed) {
            this.containerInstance.exit();
        }
    }

    /** Marks the snackbar action clicked. */
    _action(): void {
        if (!this._onAction.closed) {
            this._onAction.next();
            this._onAction.complete();
        }
    }

    /** Marks the snackbar as opened */
    _open(): void {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }

    /** Cleans up the DOM after closing. */
    private _finishDismiss(): void {
        this._overlayRef.dispose();
        this._afterClosed.next();
        this._afterClosed.complete();
    }

    /** Gets an observable that is notified when the snack bar is finished closing. */
    afterDismissed(): Observable<void> {
        return this._afterClosed.asObservable();
    }

    /** Gets an observable that is notified when the snack bar has opened and appeared. */
    afterOpened(): Observable<void> {
        return this.containerInstance._onEnter();
    }

    /** Gets an observable that is notified when the snack bar action is called. */
    onAction(): Observable<void> {
        return this._onAction.asObservable();
    }
}

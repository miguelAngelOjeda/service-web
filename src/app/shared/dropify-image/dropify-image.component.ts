import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';
import 'dropify';

export class Avatar {
    value: string = null;
    filename: string = null;
    filetype: string = null
}

@Component({
  selector: 'app-dropify-image',
  templateUrl: './dropify-image.component.html',
  styleUrls: ['./dropify-image.component.scss']
})
export class DropifyImageComponent implements OnInit {
  public avatar : Avatar;
  public isDisabled = false;
  @Output() valueAvatar = new EventEmitter<Avatar>();
  @Input() accept;
  @Input() dataMaxFile;
  @Input() dataErrorsPosition;
  @Input() dataShowErrors;

  constructor() {
    this.avatar = new Avatar;
   }

  ngOnInit() {
    this.onInitDropify();
  }

  onInitDropify() {
    let drEvent =  (<any>$('.dropify') ).dropify({
        tpl: {
            wrap:            '<div class="dropify-wrapper"></div>',
            loader:          '<div class="dropify-loader"></div>',
            message:         '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
            preview:         '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
            filename:        '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
            clearButton:     '<button type="button" (click)="onFileDelete($event)" class="dropify-clear">{{ remove }}</button>',
            errorLine:       '<p class="dropify-error">{{ error }}</p>',
            errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
        },
        messages: {
                default: 'Arrastre un archivo o haga clic aquí',
                replace: 'Arrastre un archivo o haga clic en reemplazar',
                remove: 'Eliminar',
                error: 'Lo sentimos, el archivo demasiado grande'
        },
        error: {
              fileSize: 'El tamaño del archivo es demasiado grande ({{ value }} max).',
              minWidth: 'El ancho de la imagen es demasiado pequeño ({{ value }}}px min).',
              maxWidth: 'El ancho de la imagen es demasiado grande ({{ value }}}px max).',
              minHeight: 'The image height is too small ({{ value }}}px min).',
              maxHeight: 'La altura de la imagen es demasiado grande ({{ value }}px max).',
              imageFormat: 'El formato de la imagen no está permitido ({{ value }} only).'
        }
    });

  }

  @Input()
  set disabled(disabled: any) {
    this.isDisabled = disabled;
  }

  @Input()
  set pathImage(pathImage: any) {
    if(pathImage){
      let drEvent = (<any>$('.dropify') ).data('dropify');
      drEvent.resetPreview();
      drEvent.clearElement();
      drEvent.settings.defaultFile = environment.api_url +"/DisplayImage?url=" + pathImage;
      drEvent.destroy();
      drEvent.init();
    }
  }

  @HostListener('click', ['$event.target.type'])
  onFileDelete(event) {
    if(event === 'button'){
      this.avatar = new Avatar;
      this.valueAvatar.emit(this.avatar);
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar.filename = file.name;
        this.avatar.filetype = file.type;
        this.avatar.value = reader.result.toString().split(',')[1];
        this.valueAvatar.emit(this.avatar);
      };
    }

}

}

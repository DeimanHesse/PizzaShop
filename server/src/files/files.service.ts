import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

//модул дл раоты с файловой системой
import * as fs from 'fs';
import * as path from 'path';
//модул дл раоты с путми
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile (file): Promise<string> {
        try {
            //генерируем название дл файла
            const fileName = uuid.v4() + '.jpg';
            //получаем пут к этому файлу
            const filePath = path.resolve(__dirname, "..", 'static');
            //делаем проверку если по этому пути ничего не существует, создаём папку
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            //записываем файл в эту папку
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
            
        } catch (error) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";
// import { User } from "src/users/users.model";
// import { UserRoles } from "./user-roles.module";


//создаём интерфейс типизации для создания объекта из нашего класса
interface RoleCreationAttrs {
    value: string,
    description: string
}


@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique:true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    //связь между таблицами
    //здесь мы указываем, с какой сущностью мы связываем и через какую таблицу делаем это
    //т.е. текущую таблицу roles мы связываем с User через UserRoles
    //такое же связываение необходимо реализовать и в модели Users
    //также мы должны импортировать эти таблицы в модули
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}

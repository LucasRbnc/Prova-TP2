import mongoose from "mongoose";
const { Schema } = mongoose;

const MilitarSchema = new Schema({
    nome: { type:String, maxlength: [50, "O nome pode ter no máximo 50 caracteres"], required: [true, "O nome não pode ser nulo"]},
    idade: { type:Number, maxlength: 3, required: true},
    email: {
        type:String,
        maxlength: [100, "O e-mail pode ter no máximo 60 caracteres"],
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string) {
                // expressão regular para validar o formato do e-mail
                const regex = /^[^\s@]+@(eb|marinha|fab)\.mil\.br$/;
                return regex.test(value);
            },
            message: (props: any) =>
                `${props.value} não é um formato de e-mail válido`,
        },
    },
    fone: { 
        type:String,         
        maxlength: [11, "O telefone pode ter no máximo 11 caracteres"],
        trim: true,
        unique: true,
        required: [true, "O telefone é obrigatório"],
        validate: {
            validator: function (value: string) {
                const regex = /^[0-9]{11}$/;
                const ddds:number[] = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42, 43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];
                
                return regex.test(value);
            },
            message: (props: any) => `${props.value} não é telefone válido`,
        }
    },
});

const SoldadoSchema = new Schema({
    cim: { type:Number, maxlength: 10, required: [true, "O cim é obrigatório"], unique: true},
    altura: { 
        type:Number, 
        required: true,
        validate: {
            validator: function(value: number){
                return value >= 1.62;
            },
            message: (props: any) => `${props.value} não é uma altura válida`,
        }
    },
    militar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Militar',
        required: true,
        validate: {
            validator: async function (id: string) {
                const militar = await Militar.findById(id); 
                return !!militar;
            },
            message: 'O militar em questão não existe!',
        }
    },
});

const PatenteSchema = new Schema({
    codigo: { 
        type:Number, 
        required: true,
        validate: {
            validator: async function (value:number) {
                return value > 0 && value <= 25
            },
            message: (props: any) => `${props.value} não é um código valido!`,
        }
    },
    descricao: { type:String, maxlength: [30, "A descrição da patente so pode ter até 30 caracteres!"], required: [true, "A descrição não pode estar vazia!!"] }
})

const Soldado = mongoose.model("Soldado", SoldadoSchema, "soldados");
const Militar = mongoose.model("Militar", MilitarSchema, "militares");
const Patente = mongoose.model("Patente", PatenteSchema, "patentes");

export {Militar, Soldado, Patente};

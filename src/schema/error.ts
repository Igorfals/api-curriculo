import { ZodError } from "zod";

const traduzirErro = (issue: any) => {
    switch (issue.code) {
        case "invalid_type":
            return `O campo '${issue.path.join(".")}' deve ser do tipo ${issue.expected}, mas recebeu ${issue.received}`;
        case "invalid_literal":
            return `O campo '${issue.path.join(".")}' precisa ter exatamente o valor '${issue.expected}'`;
        case "too_small":
            return `O campo '${issue.path.join(".")}' deve ser no mínimo ${issue.minimum}${issue.type === "string" ? " caracteres" : ""}`;
        case "too_big":
            return `O campo '${issue.path.join(".")}' deve ser no máximo ${issue.maximum}${issue.type === "string" ? " caracteres" : ""}`;
        case "invalid_enum_value":
            return `O campo '${issue.path.join(".")}' deve ser um dos seguintes valores: ${issue.options.join(", ")}`;
        case "unrecognized_keys":
            return `Chave(s) não reconhecida(s): ${issue.keys.join(", ")}`;
        case "invalid_union":
            return `O campo '${issue.path.join(".")}' não corresponde a nenhum dos formatos esperados`;
        case "invalid_union_discriminator":
            return `O campo '${issue.path.join(".")}' possui um valor discriminador inválido`;
        case "invalid_argument":
            return `O campo '${issue.path.join(".")}' recebeu um argumento inválido`;
        case "invalid_return_type":
            return `O retorno da função associada ao campo '${issue.path.join(".")}' não é válido`;
        case "invalid_date":
            return `O campo '${issue.path.join(".")}' precisa conter uma data válida`;
        case "invalid_string":
            return `O campo '${issue.path.join(".")}' contém um formato de string inválido`;
        case "not_multiple_of":
            return `O campo '${issue.path.join(".")}' precisa ser um múltiplo de ${issue.multipleOf}`;
        case "not_finite":
            return `O campo '${issue.path.join(".")}' precisa ser um número finito`;
        default:
            return issue.message;
    }
};

export const formatErrors = (error: ZodError) => {
    return error.issues.map(issue => ({
        campo: issue.path.join(".") || "geral",
        mensagem: traduzirErro(issue)
    }));
};

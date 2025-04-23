package com.senai.listaangular.Controller;

import com.senai.listaangular.entite.contato;
import com.senai.listaangular.service.contatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin

public class contatoController {

    @Autowired
    private contatoService contatoservice;

    @PostMapping
    public Contato save(Requestbody Contato conato) {
        return contatoservice.save (contato);

    }
    @GetMapping ("/{id}")
    public

}
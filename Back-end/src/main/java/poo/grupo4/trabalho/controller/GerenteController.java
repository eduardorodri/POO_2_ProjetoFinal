package poo.grupo4.trabalho.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import poo.grupo4.trabalho.service.GerenteService;
import poo.grupo4.trabalho.entity.Gerente;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GerenteController {

  @Autowired()
  GerenteService gerenteService;

  @PostMapping("/gerente")
  public void criandoGerente(@RequestBody Gerente novoGerente) {
    gerenteService.criandoGerente(novoGerente);
    return;
  }

  @PutMapping("/gerente/{id}")
  public void atualizandoGerente(@RequestBody Gerente gerenteAtualizado, @PathVariable() Long id) {
    gerenteService.atualizandoGerente(gerenteAtualizado, id);
    return;
  }

  @GetMapping("/gerente/{id}")
  public Optional<Gerente> pegandoDadosGerente(@PathVariable Long id) {
    return gerenteService.pegandoDadosGerente(id);
  }

  @GetMapping("/gerente")
  public List<Gerente> gerenteService() {
    return gerenteService.pegandoTodosDadosGerente();
  }

  @DeleteMapping("/gerente/{id}")
  public Optional<Gerente> deletandoDadosGerente(@PathVariable int id) {
    return gerenteService.deletandoDadosGerente(id);
  }

}

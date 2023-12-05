package poo.grupo4.trabalho.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import poo.grupo4.trabalho.service.PrecoService;
import poo.grupo4.trabalho.entity.Preco;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class PrecoController {

  @Autowired()
  PrecoService precoService;

  @PostMapping("/preco")
  public void criandoPreco(@RequestBody Preco novoPreco) {
    precoService.criandoPreco(novoPreco);
    return;
  }

  @PutMapping("/preco/{id}")
  public void atualizandoPreco(@RequestBody Preco precoAtualizado, @PathVariable() int id) {
    precoService.atualizandoPreco(precoAtualizado, id);
    return;
  }

  @GetMapping("/preco/{id}")
  public Optional<Preco> pegandoDadosPreco(@PathVariable int id) {
    return precoService.pegandoDadosPreco(id);
  }

  @DeleteMapping("/preco/{id}")
  public Optional<Preco> deletandoDadosPreco(@PathVariable int id) {
    return precoService.deletandoDadosPreco(id);
  }

  @GetMapping("/preco")
  public List<Preco> precoService() {
    return precoService.pegandoTodosDadosPreco();
  }

}

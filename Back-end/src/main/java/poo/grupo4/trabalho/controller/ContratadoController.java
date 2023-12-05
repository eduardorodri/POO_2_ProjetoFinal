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

import poo.grupo4.trabalho.entity.Contratado;
import poo.grupo4.trabalho.service.ContratadoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class ContratadoController {

  @Autowired()
  ContratadoService contratadoService;

  @PostMapping("/contratado/{id}")
  public void criarFuncionarioContratado(@RequestBody Contratado novoContratado, @PathVariable Long id) {
    contratadoService.criarFuncionarioContratado(novoContratado, id);
    return;
  }

  @PutMapping("/contratado/{id}")
  public void atualizarFuncionarioContratado(@RequestBody Contratado novoContratado, @PathVariable Long id) {
    contratadoService.atualizarFuncionarioContratado(novoContratado, id);
  }

  @GetMapping("/contratado/{id}")
  public Optional<Contratado> pegarDadosFuncionarioContratado(@PathVariable Long id) {
    return contratadoService.pegarDadosFuncionarioContratado(id);
  }

  @DeleteMapping("/contratado/{id}")
  public void deletarFuncionarioContratado(@PathVariable Long id) {
    contratadoService.deletarFuncionarioContratado(id);
  }

  @GetMapping("/contratado")
  public List<Contratado> contratadoService() {
    return contratadoService.pegandoTodosDadosContratado();
  }

}

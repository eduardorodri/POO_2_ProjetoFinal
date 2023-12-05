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

import poo.grupo4.trabalho.service.PedidoService;
import poo.grupo4.trabalho.entity.Pedido;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class PedidoController {

  @Autowired()
  PedidoService pedidoService;

  @PostMapping("/pedido")
  public void criandoPedido(@RequestBody Pedido novoPedido) {
    pedidoService.criandoPedido(novoPedido);
    return;
  }

  @PutMapping("/pedido/{id}")
  public void atualizandoPedido(@RequestBody Pedido PedidoAtualizado, @PathVariable() int id) {
    pedidoService.atualizandoPedido(PedidoAtualizado, id);
    return;
  }

  @GetMapping("/pedido/{id}")
  public Optional<Pedido> pegandoDadosPedido(@PathVariable int id) {
    return pedidoService.pegandoDadosPedido(id);
  }

  @DeleteMapping("/pedido/{id}")
  public Optional<Pedido> deletandoDadosPedido(@PathVariable int id) {
    return pedidoService.deletandoDadosPedido(id);
  }

  @GetMapping("/pedido")
  public List<Pedido> pedidoService() {
    return pedidoService.pegandoTodosDadosPedido();
  }

}

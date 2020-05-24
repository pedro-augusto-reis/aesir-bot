# Aesir BOT

Bot para Discord com finalidade de realizar "tracking" de MVPs, registrando o horário de morte e informando o horário de respawn.

## Adicionar MVP Tracking

### Com código do MVP

```
%mvp -A 12:37 354/785 1511
```

### Com nome do MVP

```
%mvp -a 08:23 23/109 Amon Ra
%mvp -a 08:23 23/109 AmonRa
%mvp -a 08:23 23/109 aMOnrA
%mvp -a 08:23 23/109 amon
```

## Pesquisar MVP Tracking

### Com nome do MVP

```
%mvp -p Amon Ra
%mvp -p Amon
%mvp -p amonra
%mvp -p amon ra
```

### Com código do MVP

```
%mvp -P 1511
```

## Comandos Gerais

### Resetar Lista MVP

```
%resetar
```

### Listar Respawn Registrados

```
%horarios
```

### Listar MVPs Com Aura

```
%aura
```
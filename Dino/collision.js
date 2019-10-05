function collision(p1, p2, p3, p4) {
  if (   ( ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )  != 0 ) {
    let t

    t = (  ( (p1.x - p3.x) * (p3.y - p4.y) ) - ( (p1.y - p3.y) * (p3.x - p4.x) )  ) / (  ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )

    let u

    u = (  ( (p1.x - p2.x) * (p1.y - p3.y) ) - ( (p1.y - p2.y) * (p1.x - p3.x) )  ) / (  ( (p1.x - p2.x) * (p3.y - p4.y) ) - ( (p1.y - p2.y) * (p3.x - p4.x) )  )

    return {
      t : t,
      u : u
    }
  } else {
    return 20
  }
}

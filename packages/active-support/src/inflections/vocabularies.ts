import { Vocabulary } from './vocabulary'
/**
 * * Implementation reference from:
 * @see {@link https://github.com/fakoua/Humanizer.ts/blob/master/src/Humanizer/Inflections/Vocabularies.ts}
 *
 * Container for registered Vocabularies.  At present, only a single vocabulary is supported: Default
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Vocabularies {
  private static Instance: Vocabulary

  /// <summary>
  /// The default vocabulary used for singular/plural irregularities.
  /// Rules can be added to this vocabulary and will be picked up by called to Singularize() and Pluralize().
  /// At this time, multiple vocabularies and removing existing rules are not supported.
  /// </summary>
  public static Default(): Vocabulary {
    if (!Vocabularies.Instance) {
      Vocabularies.Instance = Vocabularies.BuildDefault()
    }
    return Vocabularies.Instance
  }

  private static BuildDefault(): Vocabulary {
    const _default = new Vocabulary()

    _default.addPlural('$', 's')
    _default.addPlural('s$', 's')
    _default.addPlural('(ax|test)is$', '$1es')
    _default.addPlural('(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)us$', '$1i')
    _default.addPlural('(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)$', '$1es')
    _default.addPlural('(buffal|tomat|volcan|ech|embarg|her|mosquit|potat|torped|vet)o$', '$1oes')
    _default.addPlural('([dti])um$', '$1a')
    _default.addPlural('sis$', 'ses')
    _default.addPlural('(?:([^f])fe|([lr])f)$', '$1$2ves')
    _default.addPlural('(hive)$', '$1s')
    _default.addPlural('([^aeiouy]|qu)y$', '$1ies')
    _default.addPlural('(x|ch|ss|sh)$', '$1es')
    _default.addPlural('(matr|vert|ind|d)ix|ex$', '$1ices')
    _default.addPlural('([m|l])ouse$', '$1ice')
    _default.addPlural('^(ox)$', '$1en')
    _default.addPlural('(quiz)$', '$1zes')
    _default.addPlural('(buz|blit|walt)z$', '$1zes')
    _default.addPlural('(hoo|lea|loa|thie)f$', '$1ves')
    _default.addPlural('(alumn|alg|larv|vertebr)a$', '$1ae')
    _default.addPlural('(criteri|phenomen)on$', '$1a')

    _default.addSingular('s$', '')
    _default.addSingular('(n)ews$', '$1ews')
    _default.addSingular('([dti])a$', '$1um')
    _default.addSingular('(analy|ba|diagno|parenthe|progno|synop|the|ellip|empha|neuro|oa|paraly)ses$', '$1sis')
    _default.addSingular('([^f])ves$', '$1fe')
    _default.addSingular('(hive)s$', '$1')
    _default.addSingular('(tive)s$', '$1')
    _default.addSingular('([lr]|hoo|lea|loa|thie)ves$', '$1f')
    _default.addSingular('(^zomb)?([^aeiouy]|qu)ies$', '$2y')
    _default.addSingular('(s)eries$', '$1eries')
    _default.addSingular('(m)ovies$', '$1ovie')
    _default.addSingular('(x|ch|ss|sh)es$', '$1')
    _default.addSingular('([m|l])ice$', '$1ouse')
    _default.addSingular('(o)es$', '$1')
    _default.addSingular('(shoe)s$', '$1')
    _default.addSingular('(cris|ax|test)es$', '$1is')
    _default.addSingular('(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)i$', '$1us')
    _default.addSingular('(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)es$', '$1')
    _default.addSingular('^(ox)en', '$1')
    _default.addSingular('(matr|d)ices$', '$1ix')
    _default.addSingular('(vert|ind)ices$', '$1ex')
    _default.addSingular('(quiz)zes$', '$1')
    _default.addSingular('(buz|blit|walt)zes$', '$1z')
    _default.addSingular('(alumn|alg|larv|vertebr)ae$', '$1a')
    _default.addSingular('(criteri|phenomen)a$', '$1on')
    _default.addSingular('([b|r|c]ook|room|smooth)ies$', '$1ie')

    _default.addIrregular('person', 'people')
    _default.addIrregular('man', 'men')
    _default.addIrregular('human', 'humans')
    _default.addIrregular('child', 'children')
    _default.addIrregular('sex', 'sexes')
    _default.addIrregular('move', 'moves')
    _default.addIrregular('goose', 'geese')
    _default.addIrregular('wave', 'waves')
    _default.addIrregular('die', 'dice')
    _default.addIrregular('foot', 'feet')
    _default.addIrregular('tooth', 'teeth')
    _default.addIrregular('curriculum', 'curricula')
    _default.addIrregular('database', 'databases')
    _default.addIrregular('zombie', 'zombies')
    _default.addIrregular('personnel', 'personnel')
    // Fix #78a
    _default.addIrregular('cache', 'caches')

    _default.addIrregular('is', 'are', false)
    _default.addIrregular('that', 'those', false)
    _default.addIrregular('this', 'these', false)
    _default.addIrregular('bus', 'buses', false)
    _default.addIrregular('staff', 'staff', false)
    _default.addIrregular('training', 'training', false)

    _default.addUncountable('equipment')
    _default.addUncountable('information')
    _default.addUncountable('corn')
    _default.addUncountable('milk')
    _default.addUncountable('rice')
    _default.addUncountable('money')
    _default.addUncountable('species')
    _default.addUncountable('series')
    _default.addUncountable('fish')
    _default.addUncountable('sheep')
    _default.addUncountable('deer')
    _default.addUncountable('aircraft')
    _default.addUncountable('oz')
    _default.addUncountable('tsp')
    _default.addUncountable('tbsp')
    _default.addUncountable('ml')
    _default.addUncountable('l')
    _default.addUncountable('water')
    _default.addUncountable('waters')
    _default.addUncountable('semen')
    _default.addUncountable('sperm')
    _default.addUncountable('bison')
    _default.addUncountable('grass')
    _default.addUncountable('hair')
    _default.addUncountable('mud')
    _default.addUncountable('elk')
    _default.addUncountable('luggage')
    _default.addUncountable('moose')
    _default.addUncountable('offspring')
    _default.addUncountable('salmon')
    _default.addUncountable('shrimp')
    _default.addUncountable('someone')
    _default.addUncountable('swine')
    _default.addUncountable('trout')
    _default.addUncountable('tuna')
    _default.addUncountable('corps')
    _default.addUncountable('scissors')
    _default.addUncountable('means')
    _default.addUncountable('mail')

    return _default
  }
}
